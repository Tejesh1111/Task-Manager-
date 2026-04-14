const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    adminDeleteTask
} = require("../controllers/taskController");

// User routes
router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

// 🔥 Admin route
router.delete("/admin/:id", protect, isAdmin, adminDeleteTask);

module.exports = router;