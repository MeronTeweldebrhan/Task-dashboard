import type { Task, TaskStatus, TaskPriority } from "../types/Index";

export function filterTasks(tasks: Task[], statusFilter: TaskStatus | "all", priorityFilter: TaskPriority | "all") {
  return tasks.filter(task => {
    const statusMatch = statusFilter === "all" || task.status === statusFilter;
    const priorityMatch = priorityFilter === "all" || task.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });
}



export function searchTasks(tasks: Task[], query: string) {
  if (!query.trim()) return tasks;
  const lower = query.toLowerCase();
  return tasks.filter(task =>
    task.title.toLowerCase().includes(lower) ||
    task.description.toLowerCase().includes(lower)
  );
}

export function validateTask(task: Partial<Task>) {
  const errors: { [key: string]: string } = {};
  if (!task.title || !task.title.trim()) errors.title = "Title is required.";
  if (!task.description || !task.description.trim()) errors.description = "Description is required.";
  if (!task.dueDate || isNaN(Date.parse(task.dueDate))) errors.dueDate = "Valid due date is required.";
  return errors;
}

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Invalid date";
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}
