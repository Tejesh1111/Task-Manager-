require("./config/db");

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const taskRoutes = require("./routes/taskRoutes");




dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


app.use("/api/v1/auth", authRoutes);

app.get("/api/v1/protected", protect, (req, res) => {
    res.json({
        message: "You accessed protected route",
        user: req.user
    });
});

app.use("/api/v1/tasks", taskRoutes);