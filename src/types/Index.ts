export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'overdue';
 export type TaskPriority = 'all'| "low" | "medium" | "high";

 export interface TaskFormProps {
   onAddTask: (task: Task) => void;
 }
export interface Task {
  id: string;
  title: string;
  description: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate: string;
}
 
export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onPriorityChange:(taskId:string,newPriority:TaskPriority) =>void
  onDelete: (taskId: string) => void;
  onEdit: (updatedTask: Task) => void
}

export interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onPriorityChange: (taskId: string, newPriority: TaskPriority) => void;
  onDelete: (taskId: string) => void;
  onEdit: (updatedTask: Task) => void
}

export interface TaskFilterProps {
 onStatusFilterChange: (status: TaskStatus | "all") => void;
 onPriorityFilterChange:(status: TaskPriority | "all") => void;
 currentStatus?: string; 
  currentPriority?: string;
}

