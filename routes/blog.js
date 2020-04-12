const router = require('express').Router();
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const auth = require('../middleware/auth');
const isBlogOwner = require('../middleware/isBlogOwner');
const isCommentOwner = require('../middleware/isCommentOwner');

router.get('/', async (req, res)=>{
    const blogs = await Blog.find();

    res.json(blogs);
});

router.get('/:id', async (req, res)=>{
    const blog = await Blog.findById(req.params.id);
    const comments = await Comment.find({ blogId: blog._id })
    res.json({ blog, comments });
});

router.get('/:category', async (req, res)=>{
    const blog = await Blog.findById(req.params.category);
    res.json(blog);
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
    const updateBlog = await Blog.findByIdAndUpdate(req.params.id, req.body);
    const saveBlog = updateBlog.save();
    res.json(saveBlog);
});

router.delete('/:id', [auth, isBlogOwner], async(req, res)=>{
    const removeBlog = await Blog.findByIdAndRemove(req.params.id);
    res.json(removeBlog);
});

router.post('/:id/comment', auth, async(req, res)=>{
    const { body } = req.body;
    
    const newComment = new Comment({
        ownerId: req.user.id,
        blogId: req.params.id,
        body
    });
    const saveComment = await newComment.save();

    res.json(saveComment);
});

router.put('/:id/comment/:commentId', [auth, isCommentOwner], async(req, res)=>{
    const comment = await Comment.findOneAndUpdate({ _id: req.params.commentId }, req.body);
    const updatedComment = await comment.save();
    res.json(updatedComment);
});

router.delete('/:id/comment/:commentId', [auth, isCommentOwner], async(req, res)=>{
    const comment = await Comment.findByIdAndRemove(req.params.commentId);
    res.json(comment);
});

module.exports = router;