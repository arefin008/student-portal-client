export function getGrade(avg) {
  if (avg >= 90)
    return {
      grade: "A+",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      bar: "bg-emerald-500",
    };
  if (avg >= 80)
    return {
      grade: "A",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      bar: "bg-emerald-500",
    };
  if (avg >= 70)
    return {
      grade: "B",
      color: "text-blue-600",
      bg: "bg-blue-50",
      bar: "bg-blue-500",
    };
  if (avg >= 60)
    return {
      grade: "C",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      bar: "bg-yellow-500",
    };
  if (avg >= 50)
    return {
      grade: "D",
      color: "text-orange-600",
      bg: "bg-orange-50",
      bar: "bg-orange-500",
    };
  return {
    grade: "F",
    color: "text-red-600",
    bg: "bg-red-50",
    bar: "bg-red-500",
  };
}
