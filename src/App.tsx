import Dashboard from "./components/Dashboard.tsx/Dashboard";



function App() {
 return (
    <div>
      <Dashboard />
      <footer className="text-center text-gray-500 text-sm mt-8">
        &copy; {new Date().getFullYear()} Task Manager. All rights reserved.
      </footer>
    </div>
  );
}

export default App;