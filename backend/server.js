const express = require('express');
const router = express.Router();
const cors = require('cors');
const db = require('./config/db'); 
const app = express();

app.use(cors());
app.use(express.json()); // Parse JSON requests

// Basic route to test API
app.get('/', (req, res) => {
    res.send("API is running...");
});

// Import routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const examRoutes = require('./routes/examRoutes');

router.use(cors());
// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/exams', examRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
