// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }, // e.g., 'admin' or 'user'
    // Add other fields as needed
});

// Check if the model already exists, if not, create it
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
