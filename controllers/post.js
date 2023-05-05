const POST = require("../models/post");
const USER = require("../models/user");
const cloudinary = require("cloudinary");

const createPost = async (req, res) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "posts",
    });
    let newPost = {
      caption: req.body.caption,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      owner: req.user._id,
    };
    const post = new POST(newPost);
    await post.save();
    const user = await USER.findById(req.user._id);
    user.posts.splice(0, 0, post._id);
    await user.save();
    res.status(200).json({
      success: true,
      message: "Posted successfully",
      post,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await POST.findById(req.params.id);

    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    const user = await USER.findById(req.user._id);
    if (user.posts.includes(post._id)) {
      const index = user.posts.indexOf(post._id);
       await cloudinary.v2.uploader.destroy(post.image.public_id);
      user.posts.splice(index, 1);
      await user.save();

      await POST.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "Post Deleted",
        user,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Not your post",
        user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const likeAndUnlike = async (req, res) => {
  try {
    const post = await POST.findById(req.params.id);

    if (!post)
      return res.status(404).json({ success: true, message: "Post not found" });
    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);
      post.likes.splice(index, 1);
      await post.save();
      return res.status(200).json({
        success: true,
        message: "Post Unliked",
      });
    } else {
      post.likes.push(req.user._id);
      await post.save();
      return res.status(200).json({
        success: true,
        message: "Post Liked",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const updateCaption = async (req, res) => {
  try {
    const post = await POST.findById(req.params.id);
    if (!post)
      return res
        .status(400)
        .json({ success: false, message: "post not found" });
    const user = await USER.findById(req.user._id);

    if (req.body.caption.length < 1)
      return res
        .status(404)
        .json({ success: false, message: "caption is empty" });

    if (user.posts.includes(req.params.id)) {
      post.caption = req.body.caption;
      await post.save();
      res.status(200).json({
        success: true,
        message: "caption updated",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "post is not yours",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const getMyPost = async (req, res) => {
  try {
    const user = await USER.findById(req.user._id);
    const posts = [];
    for (let i = 0; i < user.posts.length; i++) {
      const post = await POST.findById(user.posts[i]).populate(
        "owner likes comments.user"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message || error,
    });
  }
};

const getUserPost = async (req, res) => {
  try {
    const {id} = req.params;
    
    const posts = [];

    const user = await USER.findById(id);
    if(!user)return res.status(404).json({success : false , message : "User Not Found"});

    for(let i=0 ; i<user.posts.length; i++){
        const post = await POST.findById(user.posts[i]).populate("owner likes comments.user");
        posts.push(post);
    }

    res.status(200).json({
        success : true,
        posts
    })

  } catch (error) {
    res.status(500).json({
        success : false,
        message : error.message || "GET USER'S POST ERROR"
    })
  }
};

const comment = async (req, res) => {
  try {
    const post = await POST.findById(req.params.id);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    post.comments.push({
      user: req.user._id,
      comment: req.body.comment,
    });
    await post.save();
    res.status(200).json({
      success: true,
      message: "Commented",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const commentDelete = async (req, res) => {
  try {
    let x = 0,
      y;
    const post = await POST.findById(req.params.postid);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "post not found" });

    post.comments.map((item, index) => {
      if (item._id.toString() === req.params.commentid.toString()) {
        y = index;
      }
    });

    if (
      post.owner.toString() === req.user._id.toString() ||
      post.comments[y].user.toString() === req.user._id.toString()
    ) {
      post.comments.map((item, index) => {
        if (item._id.toString() === req.params.commentid.toString()) {
          post.comments.splice(index, 1);
          x = 1;
        }
      });
      if (x === 1) {
        await post.save();

        res.status(200).json({
          message: "Comment is deleted",
        });
      } else {
        res.status(404).json({
          error: "Comment is not deleted",
        });
      }
    } else {
      res.status(404).json({
        error: "You can not delete others comment",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

//! COMMENT UPDATE

const commentUpdate = async (req, res) => {
  try {
    let x = 0,
      y;
    const post = await POST.findById(req.params.postid);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "post not found" });

    post.comments.map((item, index) => {
      if (item._id.toString() === req.params.commentid.toString()) {
        y = index;
      }
    });

    if (post.comments[y].user.toString() === req.user._id.toString()) {
      post.comments.map((item, index) => {
        if (item._id.toString() === req.params.commentid.toString()) {
          post.comments[index].comment = req.body.updatedComment;
          x = 1;
        }
      });
      if (x === 1) {
        await post.save();

        res.status(200).json({
          message: "Comment is updated",
        });
      } else {
        res.status(404).json({
          error: "Comment is not updated",
        });
      }
    } else {
      res.status(404).json({
        error: "You can not update others comment",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = {
  createPost,
  likeAndUnlike,
  deletePost,
  updateCaption,
  comment,
  commentDelete,
  commentUpdate,
  getMyPost,
  getUserPost,
};
