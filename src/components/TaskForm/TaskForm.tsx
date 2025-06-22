// components/TaskForm.tsx
import  { useState } from "react";
import type { Task,TaskFormProps } from "../../types/Index";


function TaskForm({onAddTask}:TaskFormProps) {
// const TaskForm: React.FC<TaskFormProps> = ({  }) => {
   const [form, setForm] = useState({
    title: "",
    description: "",
    status:"all",
    priority:"all",
    dueDate: "",
  });
  const generateId = () => "_" + Math.random().toString().slice(2, 11);

  const handleSubmit = () => {
    const { title, description,dueDate } = form;
    if (!title || !description || !dueDate) return alert("All fields required");
    const newTask: Task = {
      id: generateId(),
      title,
      description,
      dueDate
    };
    onAddTask(newTask);
    setForm({title:"",description:"",status:"",priority:"",dueDate:""})
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6 space-y-3">
      <input className="w-full p-2 border rounded" value={form.title} onChange={e => setForm({...form,title:e.target.value})} placeholder="Title" />
      <input className="w-full p-2 border rounded" value={form.description} onChange={e => setForm({...form,description:e.target.value})} placeholder="Description" />
      <input type="date" className="w-full p-2 border rounded" value={form.dueDate} onChange={e => setForm({...form,dueDate:e.target.value})} />
      <button className="bg-blue-600 text-white w-full py-2 rounded font-bold" onClick={handleSubmit}>Add Task</button>
    </div>
  );
};

export default TaskForm;