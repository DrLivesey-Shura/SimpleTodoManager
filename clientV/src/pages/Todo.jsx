import React, { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import Button from "../components/Button";
const Todo = () => {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
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
    setBody(e.target.value);
  };
  const handleAddTask = () => {
    if (body === "") return;
    fetch("/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body: body }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks([...tasks, data]);
        setBody("");
        setTitle("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-[500px] bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div>
        <h1 className="text-4xl font-bold text-center mb-8 mt-4 text-blue-500">
          Todo
        </h1>
        <div className="flex justify-between flex-col gap-4 mb-4">
          <input
            className="border border-blue-300
            rounded px-4 py-2 
            focus:outline-none focus:ring-2 
            focus:ring-blue-600 focus:border-transparent flex-1"
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTask();
              }
            }}
          />
          <textarea
            className="border border-blue-300
            rounded px-4 py-2 
            focus:outline-none focus:ring-2 
            focus:ring-blue-600 focus:border-transparent h-16"
            type="text"
            placeholder="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
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
