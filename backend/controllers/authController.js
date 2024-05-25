const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config/auth');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

// Register a new user
const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body; // Include role from request body

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
            role // Set role
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
                role: user.role // Include role in payload
            }
        };

        jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: payload.user }); // Send user data along with the token
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};


// Login user
const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id,
                name: user.name, // Add name and other user details here
                email: user.email,
                role: user.role 
            }
        };

        jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: payload.user }); // Send user data along with the token
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Get authenticated user
const getAuthenticatedUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        const completedPosts = user.completedPosts; // Assuming completedPosts is a field in the user model

        res.json({ user, completedPosts });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
// Forgot password        localStorage.setItem('token', res.data.token);

const forgotPassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Generate reset password token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Save token and expiration time to user
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        // Send reset password email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'workrework.sanjay@gmail.com',
                pass: 'nnefpkztnuxukzsm'
            }
        });

        const mailOptions = {
            from: 'workrework.sanjay@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `You are receiving this email because you (or someone else) have requested to reset the password for your account. Please click on the following link to reset your password: ${process.env.CLIENT_URL}/reset-password/${token}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: 'Failed to send reset password email' });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ message: 'Reset password email sent successfully' });
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Reset password
const resetPassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { password } = req.body;
    const { token } = req.params;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Clear reset password fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    register,
    login,
    getAuthenticatedUser,
     forgotPassword,
    resetPassword
};
