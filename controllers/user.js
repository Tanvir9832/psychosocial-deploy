const USER = require("../models/user");
const POST = require("../models/post");
const cloudinary = require("cloudinary");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const mailSender = require("../utils");

const signIn = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await USER.findOne({ email: email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "user already exists" });

    user = await new USER({
      name,
      email,
      password,
      avatar: { public_id: "sample _id", url: "sample url" },
      isVarified: false,
    });

    await user.save();
    const newUser = await USER.findOne({ email: email });
    if (!newUser)
      return res
        .status(404)
        .json({ success: false, message: "User Save Failed" });

    const token = newUser.tempTokenGenerate();
    await newUser.save();

    const link = `${req.protocol + "://" + req.get("host")}/user/verification/${newUser._id}/${token}`;

    let subject = "PSYCHOSOCIAL verification email";
    let btn = "verify";
    mailSender(email, subject, name, link, btn);

    res.status(200).json({
      success: true,
      message:
        "Congratulation ! Your Registration Successful \n Please Check Your Email To Verify Your Account",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration Failed",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await USER.findOne({ email: email }).select("+password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    if (!user.isVarified)
      return res
        .status(404)
        .json({ success: false, message: "Please Verify Your Email" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password" });

    const token = await user.generateToken();

    res.status(200).json({
      success: true,
      message: "Log in successful",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

const followUser = async (req, res) => {
  try {
    const userToFollow = await USER.findById(req.params.id);
    if (!userToFollow)
      return res
        .status(404)
        .json({ success: false, message: "user not found" });

    const me = await USER.findById(req.user._id);

    if (
      me.following.includes(userToFollow._id) ||
      userToFollow.followers.includes(me._id)
    ) {
      const indexOfFollowing = me.following.indexOf(userToFollow._id);
      me.following.splice(indexOfFollowing, 1);
      await me.save();

      const indexOfFollwers = userToFollow.followers.indexOf(me._id);
      userToFollow.followers.splice(indexOfFollwers, 1);
      await userToFollow.save();

      res.status(200).json({
        success: true,
        message: "Unfollowed",
        me,
        userToFollow,
      });
    } else {
      userToFollow.followers.push(req.user._id);
      await userToFollow.save();

      me.following.push(userToFollow._id);
      await me.save();
      res.status(200).json({
        success: true,
        message: "followed",
        me,
        userToFollow,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Could not follow or unfollow",
    });
  }
};

const getFollowingsPost = async (req, res) => {
  try {
    const user = await USER.findById(req.user._id);
    const posts = await POST.find({
      owner: { $in: user.following },
    }).populate("owner likes comments.user");

    let shuffle = (arr) => {
      let shuffledArray = [...arr];

      let rand;
      let temp;

      for (let i = 0; i <= arr.length - 1; i++) {
        rand = Math.floor(Math.random() * i);
        temp = shuffledArray[rand];
        shuffledArray[rand] = shuffledArray[i];
        shuffledArray[i] = temp;
      }
      return shuffledArray;
    };

    const shuffledPosts = shuffle(posts);

    res.status(200).json({
      success: true,
      user: user.following,
      posts: shuffledPosts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Followings post problem",
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const user = await USER.findById(req.user._id).select("+password");
    if (newPassword.length >= 8 && confirmPassword.length >= 8) {
      if (newPassword === confirmPassword) {
        const isSame = await user.matchPassword(currentPassword);
        if (!isSame)
          return res
            .status(404)
            .json({ success: false, message: "current password didn't match" });
        user.password = newPassword;
        await user.save();
        res.status(200).json({
          success: true,
          message: "password updated",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "New Password and confirm should be same",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Password must be at least 8 character",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await USER.findById(req.user._id);
    const { name, email } = req.body;

    if (email) {
      const duplicate = await USER.findOne({ email: email });
      if (duplicate)
        return res
          .status(404)
          .json({ success: false, message: "Can't use this email" });
      user.email = email;
    }
    if (name) user.name = name;
    await user.save();
    res.status(200).json({
      success: true,
      message: "profile updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Profile Update Failed",
    });
  }
};

const profileDelete = async (req, res) => {
  const { email, password } = req.body;
  try {
    let isRealUser, isMatch;
    const user = await USER.findById(req.user._id);

    if (email) {
      isRealUser = await USER.findOne({ email: email }).select("+password");
      if (user.email === isRealUser.email) {
        isMatch = await isRealUser.matchPassword(password);
      } else {
        return res.status(404).json({ message: "Email did not match" });
      }
    } else {
      return res.status(404).json({ message: "Please give your email" });
    }

    if (isMatch) {
      for (let i = 0; i < user.followers.length; i++) {
        const followers = await USER.findById(user.followers[i]);
        const x = followers.following.filter((id) => {
          return id.toString() !== req.user._id.toString();
        });

        followers.following = x;
        await followers.save();
      }

      for (let i = 0; i < user.following.length; i++) {
        const following = await USER.findById(user.following[i]);
        const x = following.followers.filter((id) => {
          return id.toString() != req.user._id.toString();
        });
        following.followers = x;
        await following.save();
      }

      for (let i = 0; i < user.posts.length; i++) {
        const post = await POST.findById(user.posts[i]);
        await cloudinary.v2.uploader.destroy(post.image.public_id);
        await post.remove();
      }

      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
      const x = await USER.findByIdAndDelete(user._id);

      res.status(200).cookie("token", null).json({
        success: true,
        message: "User deleted",
      });
    } else {
      return res.status(404).json({
        message: "Password did not match",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const myProfile = async (req, res) => {
  try {
    const user = await USER.findById(req.user._id).populate([
      "posts",
      "followers",
      "following",
    ]);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const getUsersProfile = async (req, res) => {
  try {
    const user = await USER.findById(req.params.id).populate([
      "followers",
      "following",
      "posts",
    ]);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const getAllusers = async (req, res) => {
  try {
    const users = await USER.find({}).populate([
      "followers",
      "following",
      "posts",
    ]);
    let newUser = users.filter((user) => {
      return user._id.toString() !== req.user._id.toString();
    });

    let shuffle = (arr) => {
      let shuffledArray = [...arr];

      let rand;
      let temp;

      for (let i = 0; i <= arr.length - 1; i++) {
        rand = Math.floor(Math.random() * i);
        temp = shuffledArray[rand];
        shuffledArray[rand] = shuffledArray[i];
        shuffledArray[i] = temp;
      }
      return shuffledArray;
    };

    const allShuffledUser = shuffle(newUser);

    res.status(200).json({
      success: true,
      newUser: allShuffledUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const userProfilePicture = async (req, res) => {
  try {
    if (req.body.image) {
      const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "profilePictures",
      });

      const user = await USER.findById(req.user._id);
      user.avatar.public_id = myCloud.public_id;
      user.avatar.url = myCloud.url;

      let newPost = {
        caption: req.body.caption,
        image: {
          public_id: myCloud.public_id,
          url: myCloud.url,
        },
        owner: req.user._id,
      };

      const post = new POST(newPost);
      await post.save();

      user.posts.splice(0, 0, post._id);
      await user.save();

      res.status(200).json({
        message: "profile picture updated",
      });
    } else {
      res.status(404).json({
        message: "upload a picture",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "profile picture didn't uploaded",
    });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) return res.status(404).json({ message: "Email is required" });
    const user = await USER.findOne({ email: email });

    if (!user) return res.status(404).json({ message: "Email is not valid" });

    //generate token
    const token = user.tempTokenGenerate();
    await user.save();

    const link = `${req.protocol + "://" + req.get("host")}/user/reset/${
      user._id
    }/${token}`;

    //!send email
    let subject = "PSYCHOSOCIAL verification email";
    let btn = "reset";
    mailSender(email, subject, user.name, link, btn);

    return res.status(200).json({
      success: true,
      message: "Email sent",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Problem",
    });
  }
};

const forgetPasswordController = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  try {
    if (req.params.id && req.params.token) {
      const hashedToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

      const user = await USER.findOne({
        _id: req.params.id,
        tempToken: hashedToken,
        tokenTime: { $gt: Date.now() },
      }).select("+password");

      // user.tempToken = undefined;
      // user.tokenTime = undefined;

      if (user) {
        if (newPassword === confirmPassword) {
          if (newPassword >= 8) {
            user.password = newPassword;
            await user.save();
            res.status(200).json({
              message: "Your Password Changed",
            });
          } else {
            res.status(404).json({
              message: "Password length should be grater than 8 character",
            });
          }
        } else {
          res.status(404).json({
            message: "Password and Confirm should be same",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Problem",
    });
  }
};

const searchingUser = async (req, res) => {
  try {
    const name = req.query.data;

    if (name.length < 1) {
      return res.status(200).json({ success: true, data: [] });
    }

    const users = await USER.find({ name: { $regex: name, $options: "i" } });

    let allUserWithoutMySelf;
    if (users.length > 0) {
      allUserWithoutMySelf = users.filter((user) => {
        return user._id.toString() !== req.user._id.toString();
      });
    }

    res.status(200).json({ success: true, data: allUserWithoutMySelf || [] });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Problem",
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { id, token } = req.params;

    if (id && token) {
      const newHashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

      const user = await USER.findOne({
        _id: req.params.id,
        tempToken: newHashedToken,
        tokenTime: { $gt: Date.now() },
      });

      if (!user)
        return res.status(404).json({
          success: false,
          message: "Email verification time expired \n   Please sign up again",
        });

      user.isVarified = true;
      // user.tempToken = undefined ;
      // user.tokenTime = undefined ;

      await user.save();

      res.status(200).json({
        success: true,
        message: "Verify SuccessFull \n You can login now",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Email Varification Failed",
    });
  }
};

module.exports = {
  signIn,
  login,
  followUser,
  getFollowingsPost,
  updatePassword,
  updateProfile,
  profileDelete,
  myProfile,
  getAllusers,
  getUsersProfile,
  userProfilePicture,
  forgetPassword,
  forgetPasswordController,
  searchingUser,
  verifyEmail,
};
