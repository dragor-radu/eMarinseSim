import User from '../models/admin.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, "User not found"));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, "Invalid password"));
        }
        const token = jwt.sign({ userId: validUser._id }, process.env.JWT_SECRET);
        const { password: hashedPasswordPassword, ...rest } = validUser._doc;
        const expiryDate = new Date(Number(new Date()) + 1000 * 60 * 60 * 24 * 7);
        res.cookie('access_token', token, { httpOnly: true , expires: expiryDate}).status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const signout = async (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

export const addAdmin = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 12);
    const user = new User({ username, email, password: hashedPassword });
    try {
        await user.save()
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        next(error);
    }
}
