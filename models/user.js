const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : [true ,'Please enter a name']
    },
    email : {
        type : String,
        unique : [true , 'Email already exists'],
        required : [true , 'Please enter a email']
    },
    avatar :{
        public_id : String,
        url : String
    },
    password :{
        type : String,
        required : [true ,'please enter a password'],
        minlength : [8,'Password must be at least 8 character'],
        select : false
    },
    posts : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Post'
        }
    ],
    followers : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ],
    following: [
        {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
        }
    ],
    isVarified :{
        type :  Boolean,
        default : false,
    },
    tempToken : String,
    tokenTime : Date,

});

userSchema.pre('save',async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
})

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password , this.password);
}
userSchema.methods.generateToken = function(){
    return jwt.sign({id : this._id},process.env.SECRET,{
        expiresIn : "90d"
    });
}
userSchema.methods.tempTokenGenerate =function(){
    const hash = crypto.randomBytes(20).toString('hex');

    this.tempToken = crypto.createHash("sha256").update(hash).digest('hex');
    this.tokenTime = Date.now() + 7 * 60 * 1000;
    return hash;
}

module.exports = mongoose.model('User',userSchema);