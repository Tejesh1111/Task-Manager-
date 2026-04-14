require("dotenv").config(); // ✅ MUST BE FIRST

const express = require("express");
const cors = require("cors");

// Debug (remove later)
console.log("DB URL:", process.env.DATABASE_URL);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import DB AFTER dotenv
require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const taskRoutes = require("./routes/taskRoutes");

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/v1/auth", authRoutes);

app.get("/api/v1/protected", protect, (req, res) => {
  res.json({
    message: "You accessed protected route",
    user: req.user
  });
});

app.use("/api/v1/tasks", taskRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});