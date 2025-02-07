const express = require('express');
const mysql = require("mysql2");
const cors = require('cors'); 
const config = require('./src/config/config.js').development;

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    dialect:config.dialect,
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.message);
        return;
    }
    console.log("Connected to MySQL database!");
});

app.get("/users", (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error in fetching results:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        res.json(results);
    });
});

app.post("/users", (req, res) => {
    const { name, email, dept } = req.body;

    if (!name || !email || !dept) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO users (name, email, department) VALUES (?, ?, ?)";
    db.query(sql, [name, email, dept], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ error: "Database insert failed" });
        }
        res.json({ message: "User added successfully", userId: result.insertId });
    });
});
// Update user details
// Update user details
app.put("/users/:id", (req, res) => {
    const { name, email, dept } = req.body;
    const userId = req.params.id; // user_id from the route parameters

    if (!name || !email || !dept) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "UPDATE users SET name = ?, email = ?, department = ? WHERE user_id = ?";
    db.query(sql, [name, email, dept, userId], (err, result) => {
        if (err) {
            console.error("Error updating data:", err);
            return res.status(500).json({ error: "Database update failed" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User updated successfully" });
    });
});


// Delete user
app.delete("/users/:id", (req, res) => {
    const userId = req.params.id;
    const sql = "DELETE FROM users WHERE user_id = ?";
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("Error deleting data:", err);
            return res.status(500).json({ error: "Database delete failed" });
        }
        res.json({ message: "User deleted successfully" });
    });
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
