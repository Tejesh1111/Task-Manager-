const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Test connection
db.getConnection((err, connection) => {
    if (err) {
        console.log("DB connection failed:", err.message);
    } else {
        console.log("MySQL Connected...");
        connection.release();
    }
});

module.exports = db;