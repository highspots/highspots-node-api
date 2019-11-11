const router = require('express').Router();
const User = require('../models/User');
const bcyrpt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../validation')

router.post('/register', async (req, res) => {
    // VALIDATE THE DATA BEFORE WE ADD USER
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Checking if the user is already in the db
    const existingUser = await User.findOne({email: req.body.email});
    if (existingUser) {
        return res.status(400).send('Email already exists');
    }

    // Hash password
    const salt = await bcyrpt.genSalt(10);
    const hashedPassword = await bcyrpt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.send({user: savedUser.id});
    } catch(err) {
        res.status(400).send(err);
    }
});

//LOGIN
router.post('/login', async (req, res) => {
   // VALIDATE THE DATA BEFORE WE ADD USER
   const { error } = loginValidation(req.body);
   if (error) {
       return res.status(400).send(error.details[0].message);
   }

   // Checking if the user is already in the db
   const user = await User.findOne({email: req.body.email});

   if (!user) {
       return res.status(400).send('Wrong email');
   }

   // Password is correct
   const validPass = await bcyrpt.compare(req.body.password, user.password);
   if (!validPass) {
       return res.status(400).send('Invalid password');
   }

   // send user
   res.send('Logged in');
});

module.exports = router;