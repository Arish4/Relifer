const express = require('express');
require('dotenv').config(); // Load environment variables

const connectDB = require('./config/db');
connectDB(); // Connect to MongoDB

const authRoutes = require("./routes/authRoutes");
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 4001;
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  });
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes); 

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));