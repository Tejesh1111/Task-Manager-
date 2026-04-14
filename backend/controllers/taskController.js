const pool = require("../config/db");

// CREATE TASK
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    if (!title || title.length < 3) {
      return res.status(400).json({ message: "Title must be at least 3 characters" });
    }

    await pool.query(
      "INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3)",
      [title, description, userId]
    );

    res.status(201).json({ message: "Task created" });

  } catch (err) {
    res.status(500).json({ message: "Error creating task" });
  }
};

// GET TASKS
const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1",
      [userId]
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// UPDATE TASK
const updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const taskId = req.params.id;
    const userId = req.user.id;

    const result = await pool.query(
      "UPDATE tasks SET title=$1, description=$2, status=$3 WHERE id=$4 AND user_id=$5 RETURNING *",
      [title, description, status, taskId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.json({ message: "Task updated" });

  } catch (err) {
    res.status(500).json({ message: "Error updating task" });
  }
};

// DELETE TASK
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    const result = await pool.query(
      "DELETE FROM tasks WHERE id=$1 AND user_id=$2 RETURNING *",
      [taskId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.json({ message: "Task deleted" });

  } catch (err) {
    res.status(500).json({ message: "Error deleting task" });
  }
};

// ADMIN DELETE
const adminDeleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const result = await pool.query(
      "DELETE FROM tasks WHERE id=$1 RETURNING *",
      [taskId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Admin deleted task" });

  } catch (err) {
    res.status(500).json({ message: "Error deleting task" });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  adminDeleteTask
};