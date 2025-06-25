// components/TaskForm.tsx
import  { useState } from "react";
import type { Task,TaskFormProps } from "../../types/Index";
import { validateTask,generateId } from "../../utils/taskUtils";


function TaskForm({onAddTask}:TaskFormProps) {
// const TaskForm: React.FC<TaskFormProps> = ({  }) => {
   const [form, setForm] = useState({
    title: "",
    description: "",
    status:"all",
    priority:"all",
    dueDate: "",
  });
  const [error, setError] = useState<{title?: string, description?: string, dueDate?: string}>({});
  

  const handleSubmit = () => {
    const { title, description,dueDate } = form;
    // Validate form fields
   const validation = validateTask({ title, description, dueDate });
  console.log("Validation result:", validation);
  if (validation.title || validation.description || validation.dueDate) {
    setError(validation);
    return;
  }
  setError({});
    // if (!title || !description || !dueDate) return alert("All fields required");
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
      <input 
      className="w-full p-2 border rounded" 
      value={form.title} 
      onChange={e => setForm({...form,title:e.target.value})} 
      onFocus={() => { if (error.title) setError(prev => ({ ...prev, title: undefined })) }}
      placeholder="Title" />
      {error.title && <div className="text-red-500">{error.title}</div>}
      <input 
      className="w-full p-2 border rounded" 
      value={form.description} 
      onChange={e => setForm({...form,description:e.target.value})} 
        onFocus={() => { if (error.description) setError(prev => ({ ...prev, description: undefined })) }}
      placeholder="Description" />
        {error.description && <div className="text-red-500">{error.description}</div>}
      <input 
      type="date" 
      className="w-full p-2 border rounded" 
      value={form.dueDate} 
      onChange={e => setForm({...form,dueDate:e.target.value})} 
      onFocus={() => { if (error.dueDate) setError(prev => ({ ...prev, dueDate: undefined })) }}
      />
        {error.dueDate && <div className="text-red-500">{error.dueDate}</div>}

      <button 
      className="bg-blue-600 text-white w-full py-2 rounded font-bold" 
      onClick={handleSubmit}>Add Task</button>
      
    </div>
  );
};

export default TaskForm;