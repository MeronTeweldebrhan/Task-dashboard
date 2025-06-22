import type { TaskItemProps, TaskStatus,TaskPriority } from '../../types/Index';

function TaskItem({ task, onDelete, onStatusChange,onPriorityChange }: TaskItemProps) {
  return (
    <li>
      <h3>Title: {task.title}</h3>
      <p>Description: {task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      <select
        value={task.status}
        onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <select
        id={`priority-${task.id}`}
        value={task.priority}
        onChange={(e) => onPriorityChange(task.id, e.target.value as TaskPriority)}
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}

export default TaskItem;