const Post = require('../models/Post');
const User = require('../models/User');

// Get all posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get post by slug
const getPostBySlug = async (req, res) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Search blog posts
const searchPosts = async (req, res) => {
    const { keyword } = req.query;
    try {
        const posts = await Post.find({
            $or: [
                { title: { $regex: keyword, $options: 'i' } }, // Case-insensitive search in title
                { content: { $regex: keyword, $options: 'i' } } // Case-insensitive search in content
            ]
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user-specific posts
const getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ author: req.user.name }).sort({ date: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a post
const createPost = async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        titleImage: req.body.titleImage,
        titleVideo: req.body.titleVideo,

           author: req.user.name,
        summary: req.body.summary,
        subtitles: req.body.subtitles,
        category : req.body.category
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a post
const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.name,
            { title: req.body.title, content: req.body.content },
            { new: true }
        );
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a post
const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.name);
        res.json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.markPostAsCompleted = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const postId = req.params.postId;

        if (!user.completedPosts.includes(postId)) {
            user.completedPosts.push(postId);
            await user.save();
            res.json(user.completedPosts);
        } else {
            res.status(400).json({ msg: 'Post already marked as completed' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getPosts,
    getUserPosts,
    createPost,
    updatePost,
    deletePost,
    getPostBySlug,
    searchPosts


};
