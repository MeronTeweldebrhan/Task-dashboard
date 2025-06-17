export type TaskStatus = 'pending' | 'in-progress' | 'completed';
 export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}
 
export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onPriorityChange:(taskId:string,newPriority:TaskPriority) =>void
  onDelete: (taskId: string) => void;
}

export interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onPriorityChange: (taskId: string, newPriority: TaskPriority) => void;
  onDelete: (taskId: string) => void;
}

export interface TaskFilterProps {
  onStatusFilterChange: (status: TaskStatus | "all") => void;
  onPriorityFilterChange: (priority: TaskPriority | "all") => void;
  currentStatus?: string; 
  currentPriority?: string; 
}

