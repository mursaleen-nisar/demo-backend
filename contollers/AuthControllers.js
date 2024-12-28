const users = require('../models/schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signup = async (req, res) => {

    try {
        // take field data from body
        const { name, email, password } = req.body;
        // Check email exist...
        const checkEmail = await users.findOne({ email });
        if (checkEmail) {
            res.status(409).send({ message: 'User already exist, you can login', success: false });
        }
        // add data in model (collection)
        const userModel = new users({ name, email, password });
        // bcrypt the password
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({ message: 'Signup successfully', success: true });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
}

const login = async (req, res) => {
    try {
        // take field data from body
        const { email, password } = req.body;
        // console.log('Request Body:', req.body);
        // Check email exist...
        const user = await users.findOne({ email });
        // console.log('User Found:', user);
        if (!user) {
            res.status(403).send({ message: 'Auth Failed email or password is wrong', success: false });
        }
        // check password compare from db password
        const isPassEqual = await bcrypt.compare(password, user.password);
        console.log('Password Match:', isPassEqual);
        if (!isPassEqual) {
            res.status(403).send({ message: 'Auth Failed email or password is wrong', success: false });
        }
        // JWT token generate
        const jwtToken = await jwt.sign(
            // first parameter - payload
            { email: user.email, _id: user._id },
            // second parameter - Secret key
            process.env.JWT_SECRET,
            // Third parameter - Expiry of user login
            { expiresIn: '24h' }
        );
        // console.log('JWT Token', jwtToken);

        res.status(200).json({ message: 'Login successfully', success: true, jwtToken, email, name: user.name });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
}

module.exports = { signup, login };