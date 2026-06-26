# 🎓 Student Management & Result Portal

A full-stack academic management system where **Admins** manage students, classes, subjects, and results — and **Students** view their profile and grades.

**Stack:** ASP.NET Core 10 Web API + React 18 + SQL Server

---

## 📦 Prerequisites

Make sure these are installed before you begin:

| Tool                                                     | Version               |
| -------------------------------------------------------- | --------------------- |
| [Visual Studio 2026](https://visualstudio.microsoft.com) | 17.x+                 |
| [.NET SDK](https://dotnet.microsoft.com/download)        | 9 or 10               |
| [SQL Server](https://www.microsoft.com/en-us/sql-server) | 2019+                 |
| [SSMS](https://aka.ms/ssmsfullsetup)                     | 19+                   |
| [Node.js](https://nodejs.org)                            | 18+                   |
| Yarn                                                     | `npm install -g yarn` |

---

## 🔗 Project Resources

### Backend Repository

Source code for the ASP.NET Core Web API:

- 🔗 **GitHub:** https://github.com/arefin008/student-management-portal

### Frontend Repository

Source code for the React application:

- 🔗 **GitHub:** https://github.com/arefin008/student-portal-client

### Database Script

SQL Server database setup script:

- 📄 **Database Script:** [script.sql](./script.sql)

Swagger

- **Swagger UI:** https://your-api-domain.com/swagger

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/arefin008/student-management-portal.git
```

---

### 2. Setup the Database

1. Open **SSMS** and connect to your SQL Server
2. Click **New Query**
3. Open and paste the contents of `script.sql` (repo root)
4. Press **F5** to execute
5. Confirm `StudentPortalDB` appears in Object Explorer

---

### 3. Configure the Backend

Open `StudentPortal.API/appsettings.json` and update the connection string to match your SQL Server:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=StudentPortalDB;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "Jwt": {
    "Key": "YourSuperSecretKeyMustBe32CharactersLong!!",
    "Issuer": "StudentPortalAPI",
    "Audience": "StudentPortalClient"
  }
}
```

> Common server names: `.` or `localhost` · `.\SQLEXPRESS` · `(localdb)\MSSQLLocalDB`

---

### 4. Seed Admin & Student Passwords

Temporarily add these lines at the **top** of `Program.cs` (before `var builder = ...`):

```csharp
Console.WriteLine("Admin hash:   " + BCrypt.Net.BCrypt.HashPassword("Admin@123", 11));
Console.ReadLine();
```

Run the project (`F5`) → copy both hashes from the console, then run this in SSMS:

```sql
USE StudentPortalDB;

UPDATE Users SET PasswordHash = 'PASTE_ADMIN_HASH_HERE'
WHERE Username = 'admin';

INSERT INTO Users (Username, PasswordHash, Role)
VALUES ('student', 'PASTE_STUDENT_HASH_HERE', 'Student');
```

**Remove** the `Console.WriteLine` lines after you're done.

---

### 5. Run the Backend

Open the solution in Visual Studio 2022:

```bash
# Visual Studio
# Right-click studentManagement → Set as Startup Project → Press F5

```

Swagger opens at: `https://localhost:{PORT}/swagger`

> **Note your port number** — you'll need it in the next step.

---

### 6. Configure & Run the Frontend

```bash
git clone https://github.com/arefin008/student-portal-client.git
cd student-portal-client
```

# Install dependencies

yarn install

````

Update the API port in two files:

**`vite.config.js`**
```js
proxy: {
  "/api": {
    target: your ASP.NET port
  }
}
````

**`src/api/axiosInstance.js`**

```js
const api = axios.create({
  baseURL: "your ASP.NET port",
});
```

Then start the dev server:

```bash
yarn dev
```

Open **http://localhost:3000** 🎉

---

## 👤 Login Credentials

| Role    | Username | Password    |
| ------- | -------- | ----------- |
| Admin   | `admin`  | `Admin@123` |
| Student | ``       | ``          |

---

```

### Tables

**`Users`** — Login accounts for admins and students

| Column         | Type          | Description                |
| -------------- | ------------- | -------------------------- |
| `Id`           | INT (PK)      | Auto-increment ID          |
| `Username`     | NVARCHAR(100) | Email or username (unique) |
| `PasswordHash` | NVARCHAR(255) | BCrypt hashed password     |
| `Role`         | NVARCHAR(20)  | `Admin` or `Student`       |

**`Classes`** — Academic classes or sections

| Column | Type          | Description       |
| ------ | ------------- | ----------------- |
| `Id`   | INT (PK)      | Auto-increment ID |
| `Name` | NVARCHAR(100) | Class name        |

**`Students`** — Student profiles

| Column           | Type          | Description              |
| ---------------- | ------------- | ------------------------ |
| `Id`             | INT (PK)      | Auto-increment ID        |
| `FullName`       | NVARCHAR(150) | Full name                |
| `Email`          | NVARCHAR(150) | Email (unique)           |
| `Phone`          | NVARCHAR(20)  | Contact number           |
| `ClassId`        | INT (FK)      | References `Classes(Id)` |
| `EnrollmentDate` | DATE          | Date of enrollment       |

**`Subjects`** — Academic subjects

| Column | Type          | Description       |
| ------ | ------------- | ----------------- |
| `Id`   | INT (PK)      | Auto-increment ID |
| `Name` | NVARCHAR(100) | Subject name      |

**`Results`** — Marks per student per subject

| Column      | Type         | Description               |
| ----------- | ------------ | ------------------------- |
| `Id`        | INT (PK)     | Auto-increment ID         |
| `StudentId` | INT (FK)     | References `Students(Id)` |
| `SubjectId` | INT (FK)     | References `Subjects(Id)` |
| `Marks`     | DECIMAL(5,2) | Score between 0–100       |

---

## 📡 API Reference

Base URL: `https://localhost:{PORT}/api` — Full docs at `/swagger`

| Method | Endpoint                | Auth  | Description             |
| ------ | ----------------------- | ----- | ----------------------- |
| POST   | `/auth/login`           | None  | Login, returns JWT      |
| GET    | `/students`             | Any   | List all students       |
| POST   | `/students`             | Admin | Add student             |
| PUT    | `/students/{id}`        | Admin | Update student          |
| DELETE | `/students/{id}`        | Admin | Delete student          |
| GET    | `/classes`              | Any   | List all classes        |
| POST   | `/classes`              | Admin | Add class               |
| PUT    | `/classes/{id}`         | Admin | Update class            |
| DELETE | `/classes/{id}`         | Admin | Delete class            |
| GET    | `/subjects`             | Any   | List all subjects       |
| POST   | `/subjects`             | Admin | Add subject             |
| PUT    | `/subjects/{id}`        | Admin | Update subject          |
| DELETE | `/subjects/{id}`        | Admin | Delete subject          |
| GET    | `/results`              | Admin | All results             |
| GET    | `/results/student/{id}` | Any   | Student results + grade |
| POST   | `/results`              | Admin | Save result             |
| GET    | `/dashboard/stats`      | Admin | Dashboard stats         |

---

## 📊 Grade System

| Average  | Grade |
| -------- | ----- |
| 90 – 100 | A+    |
| 80 – 89  | A     |
| 70 – 79  | B     |
| 60 – 69  | C     |
| 50 – 59  | D     |
| Below 50 | F     |

---

## ✨ Features

**Admin** — Dashboard with charts · Student/Class/Subject CRUD · Result entry · Excel export

**Student** — View own profile · View results and grade

**System** — JWT auth · Role-based access · Responsive design · Toast notifications · Form validation

---

_Built with ASP.NET Core 10 + React 18_
```
