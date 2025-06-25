import React, { useState, useEffect } from "react";
import TaskForm from "../TaskForm/TaskForm";
import TaskFilter from "../TaskFilter/TaskFilter";
import TaskList from "../TaskList/TaskList";
import type { Task, TaskPriority, TaskStatus } from "../../types/Index";
import { filterTasks,updateTask,searchTasks} from "../../utils/taskUtils";

const LOCAL_STORAGE_KEY = "tasks";

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
// Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
    setTasks(storedTasks);
  }, []);
// Update task status to "overdue" if due date has passed
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTasks = tasks.map((task) => {
        const now= new Date();
        const dueDate = new Date(task.dueDate);
        const isOverdue = dueDate < now && task.status !== "completed";
        return isOverdue ? { ...task, status: "overdue" as TaskStatus } : task;
      });
      setTasks(updatedTasks);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
    }, 60000);
    return () => clearInterval(interval);
  }, [tasks]);

  const addTask = (task: Task) => {
    const updated = [...tasks, task];
    setTasks(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };
// Filter tasks based on status and priority
  // and then search tasks based on the search term
  const filtered = filterTasks(tasks, statusFilter, priorityFilter);
  const searched = searchTasks(filtered, searchTerm);
  
  // Function to edit an existing task
  // It updates the task in the state and localStorage
const editTask = (updatedTask: Task) => {
  const updated = updateTask(tasks, updatedTask);
  setTasks(updated);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
};
  const updateStatus = (id: string, status: TaskStatus) => {
    const updated = tasks.map(task => task.id === id ? { ...task, status } : task);
    setTasks(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };
  const updatePriority = (id: string, priority: TaskPriority) => {
    const updated = tasks.map(task => task.id === id ? { ...task, priority } : task);
    setTasks(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter(task => task.id !== id);
    setTasks(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">📋 Task Manager</h1>
      <input
  type="text"
  className="w-full mb-4 p-2 border rounded"
  placeholder="Search tasks..."
  value={searchTerm}
  onChange={e => setSearchTerm(e.target.value)}
/>
      <TaskFilter
        onStatusFilterChange={setStatusFilter}
        onPriorityFilterChange={setPriorityFilter}
        currentStatus={statusFilter}
        currentPriority={priorityFilter}
      />
      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={searched}
        onStatusChange={updateStatus}
        onPriorityChange={updatePriority}
        onEdit={editTask}
        onDelete={deleteTask}
      />
    </div>
  );
};

export default Dashboard;