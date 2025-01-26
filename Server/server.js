const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Define allowed origins
const allowedOrigins = [
    'https://prodigy-fs-01-ei4ljyxjd-aryan-yalavarthis-projects.vercel.app'
];

// CORS middleware configuration
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));

// Routes
app.use('/api/auth', authRoutes); // Ensure authRoutes are correctly imported

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch(err => console.error(err));

module.exports = app; // Export app for use in other files
