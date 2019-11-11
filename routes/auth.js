const router = require('express').Router();
const User = require('../models/User');
const {registerValidation} = require('../validation')

router.post('/register', async (req, res) => {
    // VALIDATE THE DATA BEFORE WE ADD USER
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Checking if the user is already in the db
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) {
        return res.status(400).send('Email already exists');
    }

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch(err) {
        res.status(400).send(err);
    }
});


router.post('/login', (req, res) => {
    res.send('Login');
});

module.exports = router;