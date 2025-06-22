import type { TaskItemProps, TaskStatus, TaskPriority } from '../../types/Index';
import { TrashIcon } from "@heroicons/react/24/outline";

function TaskItem({ task, onDelete, onStatusChange, onPriorityChange }: TaskItemProps) {
  return (
    <li className="border p-4 mb-4 rounded-lg shadow-sm hover:shadow-md transition duration-300 bg-white flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div className="flex-1">
        <h3 className="font-semibold text-lg text-gray-800 mb-1">Title: {task.title}</h3>
        <p className="text-gray-600 mb-1">Description: {task.description}</p>
        <p className="text-gray-500 text-sm">Due Date: {task.dueDate}</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-2 mt-3 md:mt-0">
        <select
          value={task.status}
          id={`status-${task.id}`}
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>

        <select
          id={`priority-${task.id}`}
          value={task.priority}
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onPriorityChange(task.id, e.target.value as TaskPriority)}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <button
          onClick={() => onDelete(task.id)}
          className="text-pink-500 hover:text-pink-700 transition"
          title="Delete task"
        >
          <TrashIcon className="w-6 h-6" />
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
