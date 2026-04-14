const db = require("../config/db");

// CREATE TASK
const createTask = (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id;

    if (!title || title.length < 3) {
        return res.status(400).json({ message: "Title must be at least 3 characters" });
    }

    db.query(
        "INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)",
        [title, description, userId],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error creating task" });
            }
            res.status(201).json({ message: "Task created" });
        }
    );
};

// GET TASKS
const getTasks = (req, res) => {
    const userId = req.user.id;

    db.query(
        "SELECT * FROM tasks WHERE user_id = ?",
        [userId],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching tasks" });
            }
            res.json(results);
        }
    );
};

// UPDATE TASK
const updateTask = (req, res) => {
    const { title, description, status } = req.body;
    const taskId = req.params.id;
    const userId = req.user.id;

    // Status validation
    const validStatus = ["pending", "completed"];
    if (status && !validStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }

    db.query(
        "UPDATE tasks SET title=?, description=?, status=? WHERE id=? AND user_id=?",
        [title, description, status, taskId, userId],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error updating task" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Task not found or unauthorized" });
            }

            res.json({ message: "Task updated" });
        }
    );
};

// DELETE TASK
const deleteTask = (req, res) => {
    const taskId = req.params.id;
    const userId = req.user.id;

    db.query(
        "DELETE FROM tasks WHERE id=? AND user_id=?",
        [taskId, userId],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error deleting task" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Task not found or unauthorized" });
            }

            res.json({ message: "Task deleted" });
        }
    );
};

module.exports = { createTask, getTasks, updateTask, deleteTask };

// ADMIN DELETE ANY TASK
const adminDeleteTask = (req, res) => {
    const taskId = req.params.id;

    db.query(
        "DELETE FROM tasks WHERE id=?",
        [taskId],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error deleting task" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Task not found" });
            }

            res.json({ message: "Admin deleted task" });
        }
    );
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    adminDeleteTask
};