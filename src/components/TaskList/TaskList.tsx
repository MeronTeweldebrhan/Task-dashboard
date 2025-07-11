// import { useState } from "react";
import type { TaskListProps } from "../../types/Index";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onStatusChange, onPriorityChange, onDelete, onEdit }: TaskListProps) {
  return (
    <ul>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
            onPriorityChange={onPriorityChange}
            onEdit={onEdit}
          />
        ))
      ) : (
        <p>No tasks found.</p>
      )}
    </ul>
  );
}

export default TaskList;