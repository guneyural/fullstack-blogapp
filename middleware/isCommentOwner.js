const Comment = require('../models/comment');
const User = require('../models/user');

module.exports = async function(req, res, next){
	const getComment = await Comment.findById(req.params.commentId);
    const getUser = await User.findById(req.user.id);

    if(getComment.ownerId == getUser._id){
        next();
    }else{
        return res.status(400).json({msg: 'You can only modify your comment.'});
    }
}
