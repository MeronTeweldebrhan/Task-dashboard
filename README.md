# Task Dashboard

A modern, responsive task management dashboard built with React, TypeScript, and Vite.

## Features

- Add, edit, delete, and filter tasks
- Filter by status (pending, in-progress, completed, overdue) and priority (high, medium, low)
- Search tasks by title or description
- Inline editing of tasks
- Overdue tasks are automatically detected
- LocalStorage persistence
- Tailwind CSS for styling

## Planned Enhancements


-  **Dark Mode Toggle**
-  **Progress Tracker** 
- **Subtasks / Checklists** inside tasks
- **Reminder System** (browser/local notifications)
- **Archived Tasks** instead of permanent deletion
- **User Authentication** with Firebase/Supabase
- **Export/Import Tasks** (JSON/CSV)
## 📸 Preview

<img src="./src/assets/Screenshot 2025-06-24 232342.png" alt="Task Manager">

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd task-dashboard
   ```
2. Install dependencies:
   ```bash
   npm install
   
   ```
3. Start the development server:
   ```bash
   npm run dev

   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx/
│   │   ├── TaskForm/
│   │   ├── TaskFilter/
│   │   └── TaskList/
│   ├── types/
│   └── utils/
├── public/
├── index.html
├── package.json
└── ...
```

## Key Files
- `src/components/Dashboard.tsx/Dashboard.tsx`: Main dashboard logic and state
- `src/components/TaskForm/TaskForm.tsx`: Add new tasks
- `src/components/TaskFilter/TaskFilter.tsx`: Filter and search UI
- `src/components/TaskList/TaskList.tsx` & `TaskItem.tsx`: Task display, edit, and delete
- `src/utils/taskUtils.ts`: Filtering, searching, validation, and date formatting helpers
- `src/types/Index.ts`: TypeScript types

## Customization
- Update task statuses and priorities in `src/types/Index.ts` as needed
- Adjust styling in `src/index.css` and component classes




