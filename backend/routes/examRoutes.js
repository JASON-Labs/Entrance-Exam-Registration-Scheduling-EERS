const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Student: Register for an exam
router.post('/register', (req, res) => {
    const { user_id, exam_id } = req.body;

    if (!user_id || !exam_id) {
        return res.status(400).json({ error: "User ID and Exam ID are required" });
    }

    const sql = "INSERT INTO registrations (user_id, exam_id) VALUES (?, ?)";
    db.query(sql, [user_id, exam_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Registered for exam successfully" });
    });
});

// Student: Get their registered exams
router.get('/user/:user_id', (req, res) => {
    const user_id = req.params.user_id;

    const sql = `
        SELECT e.exam_name, e.exam_date, r.status
        FROM registrations r
        JOIN exams e ON r.exam_id = e.id
        WHERE r.user_id = ?;
    `;

    db.query(sql, [user_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

module.exports = router;
