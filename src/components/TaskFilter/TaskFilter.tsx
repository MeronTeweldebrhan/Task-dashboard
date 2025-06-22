import type { TaskFilterProps, TaskPriority, TaskStatus } from "../../types/Index";

function TaskFilter({
  onStatusFilterChange,
  onPriorityFilterChange,
  currentStatus = "all",
  currentPriority = "all",
}: TaskFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white rounded-lg shadow">
      <label htmlFor="status-filter"  className="mr-2 font-medium text-gray-700">Filter by Status:</label>
      <select
        id="status-filter"
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={currentStatus}
        onChange={(e) => onStatusFilterChange(e.target.value as TaskStatus | "all")}
      >
        <option value="all">Show All</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="overdue">Overdue</option>
      </select>

      <label htmlFor="priority-filter" className="ms-18 mr-2 font-medium text-gray-700">Filter by Priority:</label>
      <select
        id="priority-filter"
        className=" px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={currentPriority}
        onChange={(e) => onPriorityFilterChange(e.target.value as TaskPriority | "all")}
      >
        <option value="all">Show All</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
  );
}

export default TaskFilter;