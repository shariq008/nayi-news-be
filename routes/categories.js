const express = require('express');
const Category = require('../models/Category');
const authenticate = require('../middleware/auth');
const sendResponse = require('../utils/response'); // Import the response utility
const router = express.Router();

// Create a category
router.post('/', authenticate, async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        sendResponse(res, 201, 'زمرہ کامیابی سے تخلیق ہوا', category); // 201 Created
    } catch (error) {
        sendResponse(res, 400, 'زمرہ کی معلومات درست نہیں ہیں'); // 400 Bad Request
    }
});

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        sendResponse(res, 200, 'زمرے کامیابی سے حاصل ہوئے', categories); // 200 OK
    } catch (error) {
        sendResponse(res, 500, 'زمرے حاصل کرنے میں ناکامی'); // 500 Internal Server Error
    }
});

// Similar updates for other routes...

module.exports = router;
