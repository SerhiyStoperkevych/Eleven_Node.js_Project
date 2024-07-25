const jwt = require('jwt');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(401).json({msg: 'No token, authorization denied'});
    }
    try {
        const decoded = jwt.verify(token, '73475cb40a568e8a92b3a9b39fa3f92f1b123b6f4c8a1d12e2e4e85ebede3e6f6d98a75b2e97d7b6fa72b2e3d32d45f8d60f45b5e7f602fa3bfcfbb85a5f9e5f0');
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (err) {
        res.status(401).json({msg: 'Token is not valid'});
    };
};

module.exports = authMiddleware;
