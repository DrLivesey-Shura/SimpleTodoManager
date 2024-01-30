import Task from "./Task";

const TaskList = ({ tasks, setTasks }) => {
  const handleTaskUpdate = (_id, newData) => {
    fetch(`/api/task/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedTaskList = tasks.map((task) => {
          if (task._id === _id) {
            task.description = data.description;
            task.completed = data.completed;
          }
          return task;
        });
        setTasks(updatedTaskList);
      })
      .catch((err) => console.log(err));
  };

  const handleTaskDeletion = (_id) => {
    fetch(`/api/task/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedTaskList = tasks.filter((task) => task._id !== _id);
        setTasks(updatedTaskList);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="tasks-list">
      {tasks.length === 0 ? (
        <div className="text-center text-gray-400">No tasks :)</div>
      ) : (
        <h3 className="font-bold text-xl mb-4">Tasks</h3>
      )}

      <ul>
        {tasks
          .sort((a, b) => a.completed - b.completed)
          .map((task) => (
            <Task
              key={task._id}
              task={task}
              handleTaskUpdate={handleTaskUpdate}
              handleTaskDeletion={handleTaskDeletion}
            />
          ))}
      </ul>
    </div>
  );
};

export default TaskList;
