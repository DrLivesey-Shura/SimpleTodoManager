const Task = require("../Models/Task");

const createTask = async (req, res) => {
  try {
    const { description } = req.body;
    const newTask = await Task.create({ description });
    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const newData = req.body;
    const taskId = req.params.id;

    const updatedTask = await Task.findByIdAndUpdate(taskId, newData, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
