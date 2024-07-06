require('dotenv').config()
const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, process.env.AUTH_SECRET_KEY);
        req.user = decoded
        next();

    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken 