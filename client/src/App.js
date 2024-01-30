import { Routes, Route } from "react-router-dom";
import Task from "./Pages/Task";

function App() {
  return (
    <Routes>
      <Route path="/tasks" element={<Task />} />
    </Routes>
  );
}

export default App;
