const express = require('express');
const Comment = require('../models/Comment');
const authenticate = require('../middleware/auth');
const sendResponse = require('../utils/response'); // Import the response utility
const router = express.Router();

// Create a comment
router.post('/:articleId', authenticate, async (req, res) => {
    try {
        const comment = new Comment({
            content: req.body.content,
            article: req.params.articleId,
            user: req.user._id // Assuming you want to link the comment to the user
        });
        await comment.save();
        sendResponse(res, 201, 'تبصرہ کامیابی سے تخلیق ہوا', comment); // 201 Created
    } catch (error) {
        sendResponse(res, 400, 'تبصرے کی معلومات درست نہیں ہیں'); // 400 Bad Request
    }
});

// Get all comments for an article
router.get('/:articleId', async (req, res) => {
    try {
        const comments = await Comment.find({ article: req.params.articleId });
        sendResponse(res, 200, 'تبصرے کامیابی سے حاصل ہوئے', comments); // 200 OK
    } catch (error) {
        sendResponse(res, 500, 'تبصرے حاصل کرنے میں ناکامی'); // 500 Internal Server Error
    }
});

// Get a single comment
router.get('/:articleId/:commentId', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return sendResponse(res, 404, 'تبصرہ نہیں ملا'); // 404 Not Found
        }
        sendResponse(res, 200, 'تبصرہ کامیابی سے حاصل ہوا', comment); // 200 OK
    } catch (error) {
        sendResponse(res, 500, 'تبصرہ حاصل کرنے میں ناکامی'); // 500 Internal Server Error
    }
});

// Update a comment
router.put('/:articleId/:commentId', authenticate, async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId, req.body, { new: true });
        if (!updatedComment) {
            return sendResponse(res, 404, 'تبصرہ نہیں ملا'); // 404 Not Found
        }
        sendResponse(res, 200, 'تبصرہ کامیابی سے اپ ڈیٹ ہوا', updatedComment); // 200 OK
    } catch (error) {
        sendResponse(res, 400, 'تبصرہ کو اپ ڈیٹ کرنے میں ناکامی'); // 400 Bad Request
    }
});

// Delete a comment
router.delete('/:articleId/:commentId', authenticate, async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);
        if (!deletedComment) {
            return sendResponse(res, 404, 'تبصرہ نہیں ملا'); // 404 Not Found
        }
        sendResponse(res, 204, 'تبصرہ کامیابی سے حذف ہوا'); // 204 No Content
    } catch (error) {
        sendResponse(res, 500, 'تبصرہ حذف کرنے میں ناکامی'); // 500 Internal Server Error
    }
});

module.exports = router;
