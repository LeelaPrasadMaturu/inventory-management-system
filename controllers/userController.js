// const nodemailer = require('nodemailer');
// const User = require('../models/userModel'); // Assuming you have a User model
// const crypto = require('crypto');

// // Transporter for sending emails
// const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: 'helpcustomer569@gmail.com',
//         pass: 'jhac lfox ikch izhu' // Use the app password generated from Google
//     }
// });

// // Generate a random 6-digit code
// const generateVerificationCode = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
// };

// exports.signup = async (req, res) => {
//     const { name, email, password, confirmPassword } = req.body;

//     // Check if passwords match
//     if (password !== confirmPassword) {
//         return res.status(400).send('Passwords do not match');
//     }

//     try {
//         // Check if the username or email is already in use
//         const existingUser = await User.findOne({ $or: [{ name }, { email }] });
//         if (existingUser) {
//             return res.status(400).send('Username or email already exists');
//         }

//         // Generate a verification code
//         const verificationCode = generateVerificationCode();
//         const verificationCodeExpires = Date.now() + 3600000; // Code expires in 1 hour

//         // Create a new user with an unverified email
//         const user = new User({
//             name,
//             email,
//             password,
//             isVerified: false,
//             verificationCode,
//             verificationCodeExpires
//         });
//         await user.save();

//         // Send the verification email
//         const mailOptions = {
//             from: 'helpcustomer569@gmail.com',
//             to: email,
//             subject: 'Email Verification',
//             text: `Your verification code is: ${verificationCode}`
//         };
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Error sending verification email:', error); // Log detailed error
//                 return res.status(500).send('Error sending verification email');
//             }
//             res.redirect('/verify-email?email=' + email); // Redirect to verification page
//         });
//     } catch (err) {
//         console.error('Server error during signup:', err); // Log detailed error
//         res.status(500).send('Server error');
//     }
// };

// exports.renderVerifyEmail = (req, res) => {
//     const { email } = req.query;
//     res.render('verify-email', { email }); // Assuming the EJS file is named verify-email.ejs
// };

// exports.verifyCode = async (req, res) => {
//     const { email, verificationCode } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(400).send('Invalid email');
//         }

//         if (user.isVerified) {
//             return res.status(400).send('Email is already verified');
//         }

//         if (user.verificationCode !== verificationCode) {
//             return res.status(400).send('Invalid verification code');
//         }

//         if (Date.now() > user.verificationCodeExpires) {
//             return res.status(400).send('Verification code has expired');
//         }

//         // Verify the user's email
//         user.isVerified = true;
//         user.verificationCode = null;
//         user.verificationCodeExpires = null;
//         await user.save();

//         res.redirect('/'); // Redirect to index page after successful verification
//     } catch (err) {
//         console.error('Server error during email verification:', err); // Log detailed error
//         res.status(500).send('Server error');
//     }
// };

// exports.login = async (req, res) => {
//     const { name, password } = req.body;
//     try {
//         const user = await User.findOne({ name });

//         if (!user) {
//             return res.status(400).send('Invalid username or password');
//         }

//         if (!user.isVerified) {
//             return res.status(400).send('Please verify your email before logging in');
//         }

//         if (user.password !== password) {
//             return res.status(400).send('Invalid username or password');
//         }

//         req.session.user = user;
//         res.redirect('/dashboard');
//     } catch (err) {
//         console.error('Server error during login:', err); // Log detailed error
//         res.status(500).send('Server error');
//     }
// };

// // Route to handle email verification by token (optional if using code-based verification)
// exports.verifyEmail = async (req, res) => {
//     const { token } = req.query;

//     try {
//         const user = await User.findOne({ verificationToken: token });

//         if (!user) {
//             return res.status(400).send('Invalid verification token');
//         }

//         // Verify the user's email
//         user.isVerified = true;
//         user.verificationToken = null; // Remove the verification token
//         await user.save();

//         res.status(200).send('Email successfully verified! You can now log in.');
//     } catch (err) {
//         console.error('Server error during email verification:', err); // Log detailed error
//         res.status(500).send('Server error');
//     }
// };

const nodemailer = require('nodemailer');
const User = require('../models/userModel'); // Assuming you have a User model
const crypto = require('crypto');

// Transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'helpcustomer569@gmail.com',
        pass: 'jhac lfox ikch izhu' // Use the app password generated from Google
    }
});

// Generate a random 6-digit code
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.signup = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }

    try {
        // Check if the username or email is already in use
        const existingUser = await User.findOne({ $or: [{ name }, { email }] });
        if (existingUser) {
            return res.status(400).send('Username or email already exists');
        }

        // Generate a verification code
        const verificationCode = generateVerificationCode();
        const verificationCodeExpires = Date.now() + 3600000; // Code expires in 1 hour

        // Create a new user with an unverified email
        const user = new User({
            name,
            email,
            password,
            isVerified: false,
            verificationCode,
            verificationCodeExpires
        });
        await user.save();

        // Send the verification email
        const mailOptions = {
            from: 'helpcustomer569@gmail.com',
            to: email,
            subject: 'Email Verification',
            text: `Your verification code is: ${verificationCode}`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending verification email:', error); // Log detailed error
                return res.status(500).send('Error sending verification email');
            }
            res.redirect('/users/verify-email?email=' + encodeURIComponent(email)); // Redirect to verification page
        });
    } catch (err) {
        console.error('Server error during signup:', err); // Log detailed error
        res.status(500).send('Server error');
    }
};

exports.renderVerifyEmail = (req, res) => {
    const { email } = req.query;
    res.render('verify-email', { email }); // Assuming the EJS file is named verify-email.ejs
};

exports.verifyCode = async (req, res) => {
    const { email, verificationCode } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send('Invalid email');
        }

        if (user.isVerified) {
            return res.status(400).send('Email is already verified');
        }

        if (user.verificationCode !== verificationCode) {
            return res.render('verify-email', { email, errorMessage: 'Invalid verification code' });
        }

        if (Date.now() > user.verificationCodeExpires) {
            return res.render('verify-email', { email, errorMessage: 'Verification code has expired' });
        }

        // Verify the user's email
        user.isVerified = true;
        user.verificationCode = null;
        user.verificationCodeExpires = null;
        await user.save();

        res.redirect('/'); // Redirect to index page after successful verification
    } catch (err) {
        console.error('Server error during email verification:', err); // Log detailed error
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await User.findOne({ name });

        if (!user) {
            return res.status(400).send('Invalid username or password');
        }

        if (!user.isVerified) {
            return res.status(400).send('Please verify your email before logging in');
        }

        if (user.password !== password) {
            return res.status(400).send('Invalid username or password');
        }

        req.session.user = user;
        res.redirect('/dashboard');
    } catch (err) {
        console.error('Server error during login:', err); // Log detailed error
        res.status(500).send('Server error');
    }
};
