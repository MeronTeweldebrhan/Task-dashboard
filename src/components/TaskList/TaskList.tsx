import { useState } from "react";
import type { TaskFilterProps,TaskPriority,TaskStatus } from "../../types";
import TaskItem from "./TaskItem";
import TaskFilter from "../TaskFilter/TaskFilter";

// Local Filters 
interface Filters {
  status: TaskStatus | "all";
  priority: TaskPriority | "all"
}

function TaskList({ tasks, onStatusChange,onPriorityChange, onDelete }: TaskListProps){
  const [filter, setFilter] = useState<Filters>({ status: "all", priority: "all" });
  
  const handleStatusFilterChange = (status: TaskStatus | "all") => {
    setFilter((prev) => ({ ...prev, status }));
  };

  // Handle priority filter change
  const handlePriorityFilterChange = (priority: TaskPriority | "all") => {
    setFilter((prev) => ({ ...prev, priority }));
  };



  // displayed tasks based on filters
  const displayedTasks = tasks.filter((task) => {
    const matchesStatus = filter.status === "all" || task.status === filter.status;
    const matchesPriority = filter.priority === "all" || task.priority === filter.priority;
    return matchesStatus && matchesPriority;
  });

  return (
    <>
      <TaskFilter onStatusFilterChange={handleStatusFilterChange}
                 onPriorityFilterChange={handlePriorityFilterChange}
                 currentStatus={filter.status}
                 currentPriority={filter.priority}
      />
      <ul>
        {displayedTasks.length > 0 ? (
          displayedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
              onPriorityChange={onPriorityChange}
            />
          ))
        ) : (
          <p>No tasks match the selected filters.</p>
        )}
      </ul>
    </>
  );
}

export default TaskList;