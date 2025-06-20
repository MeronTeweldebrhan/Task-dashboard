import React, { useState, useEffect } from "react";
import TaskForm from "../TaskForm/TaskForm
import TaskFilter from "./TaskFilter";
import TaskList from "./TaskList";
import { Task } from "../types";

const LOCAL_STORAGE_KEY = "tasks";

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTasks = tasks.map((task) => {
        const isOverdue = new Date(task.deadline) < new Date() && task.status !== "Completed";
        return isOverdue ? { ...task, status: "Overdue" } : task;
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

  const updateStatus = (id: string, status: string) => {
    const updated = tasks.map(task => task.id === id ? { ...task, status } : task);
    setTasks(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter(task => task.id !== id);
    setTasks(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const filtered = filter ? tasks.filter(t => t.status === filter) : tasks;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">📋 Task Manager</h1>
      <TaskForm onAddTask={addTask} />
      <TaskFilter onFilterChange={setFilter} />
      <TaskList tasks={filtered} onUpdateStatus={updateStatus} onDelete={deleteTask} />
    </div>
  );
};

export default Dashboard;