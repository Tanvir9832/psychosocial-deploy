const USER = require('../models/user');
const jwt = require('jsonwebtoken');

const isAuthenticated= async(req,res,next)=>{
    try {

         const {authorization} = req.headers;
         const token = authorization.split(" ")[1];
         if(!token)return res.status(400).josn({success : false , messege : "Authentication failed" });
         const decode = jwt.verify(token,process.env.SECRET);
         req.user = await USER.findById(decode.id);
         next();
        
    } catch (error) {
        res.status(500).json({
            success : false,
            messege : "please log in first"
        })
    }
}
module.exports = isAuthenticated;