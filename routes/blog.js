const router = require('express').Router();
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const User = require('../models/user');
const auth = require('../middleware/auth');
const isBlogOwner = require('../middleware/isBlogOwner');
const isCommentOwner = require('../middleware/isCommentOwner');

router.get('/', async (req, res)=>{
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        const getBlogs = await Blog.find({$or:[{title: regex},{description: regex}]}).sort({date: 'desc'});
        if(getBlogs.length > 0){
            getBlogs
            .populate('ownerId')
            .sort({ date: 'desc' })
            .exec((err, doc)=>{
                if(err) return err;
                return res.json(doc);    
            })
        }else{
            return res.json({msg: 'No blog found'});
        }
    }
    
    Blog
    .find()
    .populate('ownerId')
    .sort({ date: 'desc' })
    .exec((err, doc)=>{
        if(err) return res.status(400).json({msg: 'Could not reach blogs.'});
        res.json(doc);
    });
});

router.get('/:id', async (req, res)=>{
    const blog = await Blog.findById(req.params.id);
    Comment.find({ blogId: blog._id })
    .populate('ownerId')
    .sort({ date: 'desc' })
    .exec((err, doc)=>{
        if(err) return res.status(400).json({msg: 'Could not reach comments.'});
        res.json({ blog, comments: doc });
    });
});

router.get('/category/:category', async (req, res)=>{
    Blog.find({ category: req.params.category })
    .sort({ date: 'desc' })
    .populate('ownerId')
    .exec((err, doc)=>{
        if(err) return res.status(400).json({ msg: 'Could not find any blog with that category.' });
        return res.json(doc);
    });
});

router.post('/', auth, async (req, res)=>{
    const {
        title,
        text,
        image,
        category
    } = req.body;

    const newBlog = new Blog({
        ownerId: req.user.id,
        title,
        text,
        image,
        category
    });
    const blog = await newBlog.save();

    res.json(blog);
});

router.put('/:id', [auth, isBlogOwner], async(req, res)=>{
    const updateBlog = await Blog.findByIdAndUpdate(req.params.id, { $set: req.body }, {new:true});
    res.json(updateBlog);
});

router.delete('/:id', [auth, isBlogOwner], async(req, res)=>{
    try{
        const removeBlog = await Blog.findByIdAndRemove(req.params.id);
        const removeComments =  await 
                                Comment.find({ blogId: req.params.id })
                                .map(item => {
                                    item.remove();
                                });
        return res.json(removeBlog);
    }catch(err){
        return res.status(400).json({ msg: 'Could not delete blog' });    
    }
});

router.post('/:id/comment', auth, async(req, res)=>{
    const { body } = req.body;
    
    const newComment = new Comment({
        ownerId: req.user.id,
        blogId: req.params.id,
        body
    });
    const saveComment = await newComment.save();

    Comment.findById(saveComment._id)
    .populate('ownerId')
    .exec((err, doc)=>{
        if(err) res.status(400).json({msg: 'Could not add comment'});
        res.json(doc);
    });
});

router.put('/comment/:commentId/edit', [auth, isCommentOwner], async(req, res)=>{
    const comment = await Comment.findByIdAndUpdate(req.params.commentId, {$set: req.body}, {new: true});
    Comment.findById(comment._id)
    .sort({ date: 'desc' })
    .populate('ownerId')
    .exec((err, doc)=>{
        if(err) return res.status(400).json({ msg: 'Could not get the comment.' });
        return res.json(doc);
    });
});

router.delete('/comment/delete/:commentId', [auth, isCommentOwner], async(req, res)=>{
    const comment = await Comment.findByIdAndRemove(req.params.commentId);
    res.json(comment);
});

function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;
