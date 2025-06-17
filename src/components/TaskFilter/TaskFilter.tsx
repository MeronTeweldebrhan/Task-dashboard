import type { TaskFilterProps,TaskPriority,TaskStatus } from "../../types";

function TaskFilter({
  onStatusFilterChange,
  onPriorityFilterChange,
  currentStatus = "all",
  currentPriority = "all",
}: TaskFilterProps) {
  return (
    <div>
      <label htmlFor="status-filter">Filter by Status: </label>
      <select
        id="status-filter"
        value={currentStatus}
        onChange={(e) => onStatusFilterChange(e.target.value as TaskStatus | "all")}
      >
        <option value="all">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <label htmlFor="priority-filter">Filter by Priority: </label>
      <select
        id="priority-filter"
        value={currentPriority}
        onChange={(e) => onPriorityFilterChange(e.target.value as TaskPriority | "all")}
      >
        <option value="all">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
  );
}

export default TaskFilter;