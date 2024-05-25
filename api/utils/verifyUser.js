import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(errorHandler
            ("Access denied! Unauthorized user!", 401)
        );
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log('Token verification failed');
            return next(errorHandler
                ("Token is not valid!", 403)
            );
        }
        req.user = user;
        next();
    });
}