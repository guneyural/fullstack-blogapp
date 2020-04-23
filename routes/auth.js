const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const Blog = require('../models/blog');

router.post('/register', async (req, res) => {
    const {
        firstName,
        lastName,
        username,
        email,
        password,
        profileImage
    } = req.body;

    if(!firstName || !lastName || !username || !email || !password){
        return res.status(400).json({msg: 'Fill all fields'});
    }

    const findUserEmail = await User.findOne({email: email});
    const findUserUsername = await User.findOne({username: username});
    if(findUserEmail) return res.status(400).json({msg: 'User with that email already exists'});
    if(findUserUsername) return res.status(400).json({msg: 'User with that username already exists'});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        firstName,
        lastName,
        username,
        profileImage,
        email,
        password: hashedPassword
    });
    const saveUser = await newUser.save();

    const token = jwt.sign({ id: saveUser._id }, 'xFiles', { expiresIn: '5d' });

    res.json({token, user: saveUser});
});

router.post('/login', async (req, res) => {
    const {
        email,
        password
    } = req.body;

    if(!email || !password) {
        return res.status(400).json({msg: 'Fill all fields'});
    }

    const findUser = await User.findOne({ email });
    if(!findUser) return res.status(400).json({msg: 'User with that email does not exist'});
    
    const compare = bcrypt.compare(password, findUser.password);
    if(!compare) return res.status(400).json({msg: 'email or password is wrong'});

    const token = jwt.sign({ id: findUser._id }, 'xFiles', { expiresIn: '5d' });

    res.json({
        token,
        user: findUser
    });
});

router.get('/', auth, async (req, res) => {
    const getUser = await User.findById(req.user.id);
    res.json(getUser);
});

router.get('/:id', (req, res)=>{
    User.findById(req.params.id)
    .then(user=>{
        Blog.find({ ownerId: req.params.id })
        .sort({ date: 'desc' })
        .populate('ownerId')
        .exec((err, blogs)=>{
            if(err) return res.status(400).json({ msg: 'User not found.' });
            return res.json({user, blogs});
        });
    })
    .catch(err => {
        return res.status(400).json({ msg: 'User not found' });
    });
});

module.exports = router;