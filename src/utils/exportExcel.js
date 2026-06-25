import * as XLSX from "xlsx";

export function exportStudentsToExcel(students) {
  const rows = students.map((s, i) => ({
    "#": i + 1,
    "Student Name": s.studentName,
    Email: s.email,
    Phone: s.phone || "-",
    Class: s.className,
  }));
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Students");
  XLSX.writeFile(wb, "students.xlsx");
}
