const express = require('express');
const Article = require('../models/Article');
const authenticate = require('../middleware/auth');
const sendResponse = require('../utils/response'); // Import the response utility
const router = express.Router();

// Create an article
router.post('/', authenticate, async (req, res) => {
    try {
        const article = new Article(req.body);
        await article.save();
        sendResponse(res, 201, 'مضمون کامیابی سے تخلیق ہوا', article); // 201 Created
    } catch (error) {
        sendResponse(res, 400, 'مضمون کی معلومات درست نہیں ہیں'); // 400 Bad Request
    }
});

// Get all articles
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find();
        sendResponse(res, 200, 'مضامین کامیابی سے حاصل ہوئے', articles); // 200 OK
    } catch (error) {
        sendResponse(res, 500, 'مضامین حاصل کرنے میں ناکامی'); // 500 Internal Server Error
    }
});

// Similar updates for other routes...

module.exports = router;
