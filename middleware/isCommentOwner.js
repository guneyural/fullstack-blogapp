const Comment = require('../models/comment');

module.exports = async function(req, res, next){
    Comment.findById(req.params.commentId)
    .sort({ date: 'desc' })
    .populate('ownerId')
    .exec((err, doc)=>{
        if(err) return res.status(400).json({msg: 'You can only modify your comments.'})
        if(req.user.id == doc.ownerId._id){
            next();
        } 
    });
}
