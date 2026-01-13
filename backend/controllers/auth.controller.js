import UserModel from '../models/User.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

function createTokenForUser(user) {
    const payload = {
        id: user.id,
        contactnumber: user.contactnumber,
        fullname: user.fullname,
        contactNumber: user.contactNumber,
        email: user.email
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
    return token;
}

export const register = async (req, res) => {
    try {
        const { name, email, contactNumber , password } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists!" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            name,
            email,
            contactNumber: contactNumber,
            password: hashedPassword,
        });

        await newUser.save();
        return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        return res.status(500).json({ message: "internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: "email or password is incorrect." });

        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) return res.status(400).json({ message: "email or password is incorrect." });

        const token = createTokenForUser(user);
        res.cookie('token', token, { httpOnly: true });

        const { password, ...userInfo } = user._doc;
        return res.status(200).json({ message: "login sucessful", token: token, user: userInfo })


    } catch (err) {
        return res.status(500).json({ message: "internal server error" });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const logout = async (req, res) => {
    const user = req.user;
    res.clearCookie("token");
    return res.status(200).json("User has been logged out.");
};