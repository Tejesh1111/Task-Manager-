const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        // Check if user exists
        db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
            if (err) {
                return res.status(500).json({ message: "DB error" });
            }

            if (result.length > 0) {
                return res.status(400).json({ message: "User already exists" });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user
            db.query(
                "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                [name, email, hashedPassword],
                (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: "Error creating user" });
                    }

                    res.status(201).json({ message: "User registered successfully" });
                }
            );
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// LOGIN
const loginUser = (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
            if (err) {
                return res.status(500).json({ message: "DB error" });
            }

            if (result.length === 0) {
                return res.status(400).json({ message: "User not found" });
            }

            const user = result[0];

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.json({
                message: "Login successful",
                token
            });
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { registerUser, loginUser };