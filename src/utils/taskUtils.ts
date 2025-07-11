import type { Task, TaskStatus, TaskPriority } from "../types/Index";

export function filterTasks(tasks: Task[], statusFilter: TaskStatus | "all", priorityFilter: TaskPriority | "all") {
  return tasks.filter(task => {
    const statusMatch = statusFilter === "all" || task.status === statusFilter;
    const priorityMatch = priorityFilter === "all" || task.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });
}


// Function to search tasks by title or description
export function searchTasks(tasks: Task[], query: string) {
  if (!query.trim()) return tasks;
  const lower = query.toLowerCase();
  return tasks.filter(task =>
    task.title.toLowerCase().includes(lower) ||
    task.description.toLowerCase().includes(lower)
  );
}
/// Validation function for task properties
export function validateTask({ title, description, dueDate }: { title: string, description: string, dueDate: string }) {
  const errors: { title?: string; description?: string; dueDate?: string } = {};
  if (!title) errors.title = "Title is required.";
  if (!description) errors.description = "Description is required.";
  if (!dueDate) errors.dueDate = "Valid due date is required.";
  return errors;
}

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Invalid date";
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export function updateTask(tasks: Task[], updatedTask: Task): Task[] {
  return tasks.map(task => task.id === updatedTask.id ? { ...task, ...updatedTask } : task);
}
// Function to generate a unique ID for a new task
export const generateId = () => "_" + Math.random().toString().slice(2, 11);