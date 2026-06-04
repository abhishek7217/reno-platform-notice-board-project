export const CATEGORIES = ["Exam", "Event", "General"];
export const PRIORITIES = ["Normal", "Urgent"];

export function formatDateForInput(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDisplayDate(value) {
  if (!value) return "Not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not set";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC"
  }).format(date);
}

export function getNoticeBadgeClass(priority) {
  return priority === "Urgent"
    ? "bg-red-100 text-red-700 ring-red-200"
    : "bg-slate-100 text-slate-600 ring-slate-200";
}

export function getPrioritySort(priority) {
  return priority === "Urgent" ? 1 : 0;
}
