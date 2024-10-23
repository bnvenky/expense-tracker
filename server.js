const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const transactionRoutes = require('./routes/transactionRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON request bodies


// Routes
app.use('/api', transactionRoutes);
app.use('/api', categoryRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
