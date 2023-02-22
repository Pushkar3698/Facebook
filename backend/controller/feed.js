const userModel = require("../models/User");
const Post = require("../models/Post");
const { getIO } = require("../socket io/io");
const Comment = require("../models/Comment");
const path = require("path");

exports.home = (req, res, next) => {
  userModel
    .findById(req.userId)
    .then((data) => {
      if (!data) {
        const error = new Error("Not able to find the user");
        error.status = 401;
        throw err;
      }

      res.status(200).json(data);
    })
    .catch((err) => console.log(err));
};

exports.createPost = async (req, res, next) => {
  try {
    const { text, createdBy } = req.body;

    console.log(req.body);
    console.log(req.file);

    // const post = new Post({ text: text, creatorId: createdBy });
    // await post.save();

    // const newPost = await post.populate("creatorId");
    // const io = getIO();
    // io.emit("posts", newPost);

    res.status(200).json({ message: "Post created" });
  } catch (err) {
    res.status(400).json({ message: "could not create post" });
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("creatorId").populate("comments");
    if (!posts) {
      throw new Error("cannot get posts");
    }

    const sortedPosts = posts.sort((a, b) => b.createdAt - a.createdAt);

    res.status(200).json(sortedPosts);
  } catch (err) {
    res.status(400).json({ message: "cannot get posts" });
  }
};

exports.addLike = async (req, res, next) => {
  try {
    const { postId, userId } = req.body;

    const post = await Post.findById(postId);
    const userInclude = post.likes.includes(userId);

    if (userInclude) {
      const filteredArr = post.likes.filter((el) => el.toString() !== userId);
      post.likes = filteredArr;
      await post.save();
    } else {
      post.likes.push(userId);

      await post.save();
    }

    await post.populate("creatorId");

    const io = getIO();
    io.emit("like-post", post);
    res.json("post liked/unliked");
  } catch (err) {
    console.log(err);
    res.status(400).json("could not create post");
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { postId, userId } = req.body;

    const post = await Post.findById(postId);

    if (post.creatorId.toString() !== userId.toString()) {
      const error = new Error();
      error.statusCode = 400;
      error.message = "this user is not the creator of the post";
      throw error;
    } else {
      post.delete();
      const io = getIO();
      io.emit("delete-post", postId);
      res.status(200).json("Post Deleted");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "this user is not the creator of the post",
      status: 400,
    });
  }
};

exports.addComment = async (req, res, next) => {
  try {
    const { userId, comment, postId } = req.body;

    const commentByUser = new Comment({
      createdBy: userId,
      comment,
    });

    await commentByUser.save();

    const post = await Post.findById(postId);

    post.comments.push(commentByUser);

    await post.save();

    const newPost = await post.populate("comments");

    const io = getIO();

    const data = {
      comments: newPost.comments,
      id: newPost._id,
    };
    io.emit("add-comment", data);

    res.json({ message: "Comment-Created" });
  } catch (err) {}
};
