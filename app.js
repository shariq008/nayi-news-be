const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const categoryRoutes = require('./routes/categories');
const commentRoutes = require('./routes/comments');
const articleRoutes = require('./routes/articles');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const User = require('./models/user'); // Import User model
const Category = require('./models/Category'); // Import Category model

require('dotenv').config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Register routes
app.use('/api/categories', categoryRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);


// Catch-all route for 404 errors
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Initialize default categories and users
async function initializeDefaults() {
  try {
    await Category.initializeDefaultCategories();
    console.log('Default categories initialized');
    await User.initializeDefaultUsers();
    console.log('Default users initialized');
  } catch (err) {
    console.error('Error initializing defaults:', err.message);
  }
}


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
