const express = require('express');
const User = require('../models/user');
const authenticate = require('../middleware/auth');
const sendResponse = require('../utils/response'); // Import the response utility
const router = express.Router();

// Create a user
router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        sendResponse(res, 201, 'صارف کامیابی سے تخلیق ہوا', user); // 201 Created
    } catch (error) {
        sendResponse(res, 400, 'صارف کی معلومات درست نہیں ہیں'); // 400 Bad Request
    }
});

// Get all users (admin only)
router.get('/', authenticate, async (req, res) => {
    if (req.user.role !== 'admin') {
        return sendResponse(res, 403, 'دسترسی کی اجازت نہیں ہے'); // 403 Forbidden
    }

    try {
        const users = await User.find();
        sendResponse(res, 200, 'صارفین کامیابی سے حاصل ہوئے', users); // 200 OK
    } catch (error) {
        sendResponse(res, 500, 'صارفین حاصل کرنے میں ناکامی'); // 500 Internal Server Error
    }
});

// Get a single user by ID
router.get('/:id', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return sendResponse(res, 404, 'صارف نہیں ملا'); // 404 Not Found
        }
        sendResponse(res, 200, 'صارف کامیابی سے حاصل ہوا', user); // 200 OK
    } catch (error) {
        sendResponse(res, 500, 'صارف حاصل کرنے میں ناکامی'); // 500 Internal Server Error
    }
});

// Update a user
router.put('/:id', authenticate, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return sendResponse(res, 404, 'صارف نہیں ملا'); // 404 Not Found
        }
        sendResponse(res, 200, 'صارف کامیابی سے اپ ڈیٹ ہوا', updatedUser); // 200 OK
    } catch (error) {
        sendResponse(res, 400, 'صارف کو اپ ڈیٹ کرنے میں ناکامی'); // 400 Bad Request
    }
});

// Delete a user
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return sendResponse(res, 404, 'صارف نہیں ملا'); // 404 Not Found
        }
        sendResponse(res, 204, 'صارف کامیابی سے حذف ہوا'); // 204 No Content
    } catch (error) {
        sendResponse(res, 500, 'صارف حذف کرنے میں ناکامی'); // 500 Internal Server Error
    }
});

module.exports = router;
