import React, { useState, useEffect } from "react";
import TaskForm from "../TaskForm/TaskForm";
import TaskFilter from "../TaskFilter/TaskFilter";
import TaskList from "../TaskList/TaskList";
import type { Task, TaskPriority, TaskStatus } from "../../types/Index";
import { filterTasks,updateTask} from "../../utils/taskUtils";

const LOCAL_STORAGE_KEY = "tasks";

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "all">("all");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
    setTasks(storedTasks);
  }, []);

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

  const filtered = filterTasks(tasks, statusFilter, priorityFilter);
  
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
      <TaskFilter
        onStatusFilterChange={setStatusFilter}
        onPriorityFilterChange={setPriorityFilter}
        currentStatus={statusFilter}
        currentPriority={priorityFilter}
      />
      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={filtered}
        onStatusChange={updateStatus}
        onPriorityChange={updatePriority}
        onEdit={editTask}
        onDelete={deleteTask}
      />
    </div>
  );
};

export default Dashboard;