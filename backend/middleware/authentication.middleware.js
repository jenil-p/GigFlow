import jwt from 'jsonwebtoken';

export const checkForAuthenticationCookie = (cookieName) => {
    return (req, res, next) => {
        const token = req.cookies?.[cookieName];
        if (!token) {
            return res.status(401).json({ message: "You are not authenticated!" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired authentication token" });
        }

        next();
    };
};