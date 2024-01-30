import Button from "./Button";
const Task = ({ task, handleTaskUpdate, handleTaskDeletion }) => {
  return (
    <div className={`${task.completed ? "opacity-60" : ""}`}>
      <li className="flex items-center p-1" key={task._id}>
        <input
          className="mr-2 cursor-pointer"
          type="checkbox"
          checked={task.completed}
          onChange={() =>
            handleTaskUpdate(task._id, { completed: !task.completed })
          }
        />
        <label
          className="flex-1 mr-2 px-2 py-1 outline-blue-500"
          onDoubleClick={(e) => {
            e.target.contentEditable = true;
            e.target.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.target.contentEditable = false;
            }
          }}
          onBlur={(e) => {
            e.target.contentEditable = false;
            console.log(e.target.innerText);
            handleTaskUpdate(task._id, { description: e.target.innerText });
          }}
        >
          {task.description}
        </label>
        <Button
          className="ml-auto bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600"
          onClick={() => handleTaskDeletion(task._id)}
        >
          Delete
        </Button>
      </li>
    </div>
  );
};

export default Task;
