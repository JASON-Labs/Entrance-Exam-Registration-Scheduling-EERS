const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Register new student
router.post("/register", async (req, res) => {
      // Debugging
    const { phone, ssc_roll, ssc_board, ssc_passing_year, hsc_roll, hsc_board, hsc_passing_year } = req.body;

    // Ensure all fields are coming in correctly
    if (!phone || !ssc_roll || !ssc_board || !ssc_passing_year || !hsc_roll || !hsc_board || !hsc_passing_year) {
        return res.status(400).json({ error: "All fields are required" });
    }
    
    const sql = "INSERT INTO users (phone, ssc_roll, ssc_board, ssc_passing_year, hsc_roll, hsc_board, hsc_passing_year) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [phone, ssc_roll, ssc_board, ssc_passing_year, hsc_roll, hsc_board, hsc_passing_year], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "User registered successfully", userId: result.insertId });
        console.log("Received Data:", req.body);
    });
    // try {
    //     const query = `INSERT INTO users (phone, ssc_roll, ssc_board, ssc_passing_year, hsc_roll, hsc_board, hsc_passing_year) 
    //                    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    //     await db.execute(query, [phone, ssc_roll, ssc_board, ssc_passing_year, hsc_roll, hsc_board, hsc_passing_year]);
    //     res.status(201).json({ message: "User registered successfully", userId: result.insertId });
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
});


// Register user for an exam
router.post("/register-exam", (req, res) => {
    const { user_id, exam_id } = req.body;

    if (!user_id || !exam_id) {
        return res.status(400).json({ error: "User ID and Exam ID are required" });
    }

    const sql = "INSERT INTO registrations (user_id, exam_id) VALUES (?, ?)";
    db.query(sql, [user_id, exam_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Exam registered successfully" });
    });
});

// Fetch all registered users
router.get('/', (req, res) => {
    const sql = "SELECT id, name, phone, ssc_roll, hsc_roll FROM users";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

module.exports = router;
