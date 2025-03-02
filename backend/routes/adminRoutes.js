const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Admin: Add a new exam
router.post('/add-exam', (req, res) => {
    const { exam_name, date, time, duration, location, unit } = req.body;  // Include location

    if (!exam_name || !date || !time || !duration || !location || !unit) {
        return res.status(400).json({ error: "Please provide exam name, date, time, duration, and location and unit" });
    }

    const sql = "INSERT INTO exams (exam_name, date, time, duration, location, unit) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [exam_name, date, time, duration, location, unit], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Exam added successfully", examId: result.insertId });
    });
});




// Admin: Get all exams
router.get('/exams', (req, res) => {
    const sql = "SELECT * FROM exams";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

module.exports = router;
