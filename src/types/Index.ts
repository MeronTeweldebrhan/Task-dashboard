export type TaskStatus = 'pending' | 'in-progress' | 'completed';
 export type TaskPriority = "low" | "medium" | "high";

 export interface TaskFormProps {
  initialData?: {
    title: string;
    description: string;
    dueDate: string;
  };
  onSubmit: (data: { title: string; description: string; dueDate: string }) => void;
  onCancel?: () => void;
 }
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
 onUpdate: (task: Task) => void;
  onPriorityChange?:(taskId:string,newPriority:TaskPriority) =>void
  onDelete: (taskId: string) => void;
}

export interface TaskItemProps {
  task: Task;
  onUpdate:(task: Task) => void
  onDelete: (taskid: string) => void;
}

export interface TaskFilterProps {
  onStatusFilterChange: (status: TaskStatus | "all") => void;
  onPriorityFilterChange: (priority: TaskPriority | "all") => void;
  currentStatus?: string; 
  currentPriority?: string; 
}

