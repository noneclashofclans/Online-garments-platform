const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Missing or invalid authorization header.' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: payload.id };
        return next();
    } catch (error) {
        console.error('JWT verification failed:', error);
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

const identifyUser = (req, res, next) => {
    let userId = null;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            userId = payload.id;
        } catch (error) {
            console.error('JWT verification failed during user identification:', error);
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }
    }

    if (!userId) {
        userId = req.headers['x-user-id'] || req.query.userId || req.body.userId;
    }

    if (!userId) {
        return res.status(400).json({ message: 'User identification is required to perform this action.' });
    }

    req.userId = userId;
    return next();
};

module.exports = { authenticateJWT, identifyUser };