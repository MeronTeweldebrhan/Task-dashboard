import { useState } from "react";
import type { TaskItemProps, TaskStatus, TaskPriority } from '../../types/Index';
import { TrashIcon,PencilIcon } from "@heroicons/react/24/outline";

function TaskItem({ task, onDelete, onStatusChange, onPriorityChange, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    status: task.status,
    priority: task.priority,
    id: task.id,
  });

  const handleSave = () => {
    onEdit(editForm);
    setIsEditing(false);
  };

  return (
    <li className="border p-4 mb-4 rounded-lg shadow-sm hover:shadow-md transition duration-300 bg-white flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div className="flex-1">
        {isEditing ? (
          <>
            <input
              className="w-full mb-1 border rounded px-2 py-1"
              value={editForm.title}
              onChange={e => setEditForm({ ...editForm, title: e.target.value })}
              placeholder="Title"
            />
            <input
              className="w-full mb-1 border rounded px-2 py-1"
              value={editForm.description}
              onChange={e => setEditForm({ ...editForm, description: e.target.value })}
              placeholder="Description"
            />
            <input
              type="date"
              className="w-full mb-1 border rounded px-2 py-1"
              value={editForm.dueDate}
              onChange={e => setEditForm({ ...editForm, dueDate: e.target.value })}
            />
          </>
        ) : (
          <>
            <h3 className="font-semibold text-lg text-gray-800 mb-1">Title: {task.title}</h3>
            <p className="text-gray-600 mb-1">Description: {task.description}</p>
            <p className="text-gray-500 text-sm">Due Date: {task.dueDate}</p>
          </>
        )}
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-2 mt-3 md:mt-0">
        {isEditing ? (
          <>
            <select
              value={editForm.status}
              id={`status-${task.id}`}
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={e => setEditForm({ ...editForm, status: e.target.value as TaskStatus })}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
            <select
              id={`priority-${task.id}`}
              value={editForm.priority}
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={e => setEditForm({ ...editForm, priority: e.target.value as TaskPriority })}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button onClick={handleSave} className="text-green-600 font-bold">Save</button>
            <button onClick={() => setIsEditing(false)} className="text-gray-500">Cancel</button>
          </>
        ) : (
          <>
            <select
              value={task.status}
              id={`status-${task.id}`}
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={e => onStatusChange(task.id, e.target.value as TaskStatus)}
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
              onChange={e => onPriorityChange(task.id, e.target.value as TaskPriority)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button onClick={() => setIsEditing(true)} className="ml-2 text-blue-500">
              <PencilIcon className="w-6 h-6 inline-block mr-1" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-pink-500 hover:text-pink-700 transition"
              title="Delete task"
            >
              <TrashIcon className="w-6 h-6" />
            </button>
            
          </>
        )}
      </div>
    </li>
  );
}

export default TaskItem;