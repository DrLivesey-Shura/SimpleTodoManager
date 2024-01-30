import { Routes, Route } from "react-router-dom";
import Task from "./Pages/Task";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Task />} />
    </Routes>
  );
}

export default App;
