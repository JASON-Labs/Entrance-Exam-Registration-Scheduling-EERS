const express = require('express');
const router = express.Router();
const cors = require('cors');
const db = require('./config/db'); 
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/users/register", (req, res) => {
    console.log("📥 Received:", req.body);
}); 

app.get('/', (req, res) => {
    res.send("API is running...");
});

// routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const examRoutes = require('./routes/examRoutes');

router.use(cors());
// Useing the Routes
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/exams', examRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
