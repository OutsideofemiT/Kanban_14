import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);
        if (decoded && decoded.username) {
            req.user = decoded; // Assign the decoded token to req.user
            next();
            return;
        }
        else {
            return res.status(403).json({ message: 'Invalid token payload' });
        }
    }
    catch (err) {
        console.error('Token validation error:', err);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
