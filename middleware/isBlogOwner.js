const User = require('../models/user');
const Blog = require('../models/blog');

module.exports = async function(req, res, next) {
    Blog.findById(req.params.id)
    .populate('ownerId')
    .exec((err, doc)=>{
        if(err) return res.status(400).json({ msg: 'Could not get the blog:/' });
       
        if(req.user.id == doc.ownerId._id) {
            next();
        }else{
            return res.status(400).json({msg: 'You are not the owner of this blog.'});
        }
    });
};