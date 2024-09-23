const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token
    if (!token) {
        return res.status(401).json({ error: 'Token not provided' }); // 401 Unauthorized
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password'); // Exclude password
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' }); // 401 Unauthorized
    }
};

module.exports = authenticate;
