const Post = require('../models/Post');

// 🔹 Create Post
exports.createpost = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content?.trim()) {
            return res.status(400).json({ error: "Content is required" });
        }

        // Check for duplicate post by same user
        const existingPost = await Post.findOne({
            user: req.user.id,
            content: content.trim()
        });

        if (existingPost) {
            return res.status(409).json({ error: "Duplicate post not allowed" });
        }

        const post = await Post.create({
            user: req.user.id,
            content: content.trim()
        });

        res.status(201).json({ message: "Content created", post });
    } catch (error) {
        console.error("Create post error:", error.message);
        res.status(500).json({ error: "Posting error" });
    }
};

// 🔹 Get All Posts
exports.getpost = async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: 1 }); // Recent posts first

        res.status(200).json(posts);
    } catch (error) {
        console.error("Get posts error:", error.message);
        res.status(500).json({ error: 'Failed to get posts' });
    }
};

// 🔹 Update Post
exports.updatepost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post || post.user.toString() !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        const { content } = req.body;
        post.content = content?.trim() || post.content;

        await post.save();
        res.json({ message: "Post updated", post });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔹 Delete Post
exports.deletepost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post || post.user.toString() !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        await post.deleteOne();
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};