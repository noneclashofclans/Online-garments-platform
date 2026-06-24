const User = require('../models/relational/User');
const jwt = require('jsonwebtoken');


const generateToken = (userId) => {
    return jwt.sign(
        { id: userId }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } 
    );
};

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

  
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'All profile registration fields are required.' });
        }

        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(409).json({ message: 'A user account with this email already exists.' });
        }

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password
        });

        const token = generateToken(newUser.id);

        res.status(201).json({
            message: 'User registered successfully.',
            token,
            user: {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        console.error('Registration processing failure:', error);
        res.status(500).json({ message: 'Internal server error during account setup.' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide both an email and password.' });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid authentication credentials.' });
        }

        const isPasswordValid = await user.validPassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid authentication credentials.' });
        }

        const token = generateToken(user.id);

        res.status(200).json({
            message: 'Authentication successful.',
            token,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login processing failure:', error);
        res.status(500).json({ message: 'Internal server error during authentication.' });
    }
};

module.exports = {register, login};