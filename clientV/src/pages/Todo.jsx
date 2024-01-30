import React, { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import Button from "../components/Button";
const Todo = () => {
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/api/task")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    setDescription(e.target.value);
  };
  const handleAddTask = () => {
    if (description === "") return;
    fetch("/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks([...tasks, data]);
        setDescription("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-[500px] bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div>
        <h1 className="text-4xl font-bold text-center mb-8 mt-4 text-blue-500">
          Todo
        </h1>
        <div className="flex justify-between mb-4">
          <input
            className="border border-blue-300
            rounded px-4 py-2 
            focus:outline-none focus:ring-2 
            focus:ring-blue-600 focus:border-transparent
            flex-1 mr-4"
            type="text"
            placeholder="Add a task"
            value={description}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTask();
              }
            }}
          />
          <Button
            className="border border-l-0 rounded text-white px-4 py-2 bg-blue-500 hover:bg-blue-600"
            onClick={handleAddTask}
          >
            Add Task
          </Button>
        </div>
      </div>
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default Todo;
