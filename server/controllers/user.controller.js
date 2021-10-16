const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    register: async (req, res) => {
        try {
            const queriedUser = await User.findOne({ email: req.body.email });

            if (queriedUser) {
                res.status(400).json({ errors: 'Email already in use.' });
                return;
            }
        } catch (err) {
            res.status(400).json(err);
        }

        const newUser = new User(req.body);

        try {
            const newUserObj = await newUser.save();
            res.json(newUserObj);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    login: async (req, res) => {
        let userQuery;

        try {
            userQuery = await User.findOne({ email: req.body.email });
        } catch (err) {
            res.status(400).json(err);
        }

        if (userQuery === null) {
            res.status(400).json({ errors: 'Email not found.' });
            return;
        }

        const passwordCheck = bcrypt.compareSync(req.body.password, userQuery.password);

        if (!passwordCheck) {
            res.status(400).json({ errors: 'Email and password do not match.' });
            return;
        }

        const userToken = jwt.sign({ id: userQuery._id }, process.env.SECRET_KEY);
        
        res
            .cookie('usertoken', userToken, process.env.SECRET_KEY, {
                httpOnly: true,
                expires: new Date(Date.now() + 9000000),
            })
            .json({ message: 'Login Successful' });
    },

    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.json({ message: 'Logout Successful' });
    },
};