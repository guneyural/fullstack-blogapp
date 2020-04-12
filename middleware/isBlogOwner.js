const User = require('../models/user');
const Blog = require('../models/blog');

module.exports = async function(req, res, next) {
    const getUser = await User.findById(req.user.id);
    const getBlog = await Blog.findById(req.params.id);

    if(getUser._id == getBlog.ownerId){
        next();
    }else{
        return res.status(400).json({msg: 'You are not the owner of this blog.'});
    }
};