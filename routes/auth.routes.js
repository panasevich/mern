const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const router = Router();

router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Min password 6 symbols').isLength({min: 6})
    ],
    async (req, res) => {
        console.log(req);
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: 'Incorrect data'})
        }
        const {email, password} = req.body;

        const candidate = await User.findOne({ email });
        console.log(req, '==================================================');
        if (candidate) {
            return res.status(400).json({ message: 'User with the same name is already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({email, password: hashedPassword});
        await user.save();
        
        res.status(201).json({message: "User created"});
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
});
router.post('/login', [
    check('email', 'Enter correct email').normalizeEmail().isEmail(),
    check('password', 'Enter password').exists()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: 'Incorrect data to login'})
        }

        const  {email, password} = req.body;

        const user =  await User.findOne({email})
        if (!user) {
            return res.status(400).json({message: 'User isn\'t exists'})
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({message: 'Wrong credentials'});
        }
        
        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        );
        res.json({token, userId: user.id});
        
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
});

module.exports = router;
