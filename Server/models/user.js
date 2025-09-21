const mongoose=require("mongoose");
const{createHmac,randomBytes}=require("crypto");
const { createUserToken } = require("../service/auth");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        

        
        
        required:true,
    },
    college:{
        type:String,
        
    },
    salt:{
        type:String,

        
    },
    profileImageURL:{
        type:String,
        default:"/default-Avatar.png"
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
    }

},{timestamps:true})
userSchema.pre("save",function(next){
   const user=this;
   if(!user.isModified("password")) return next();
   const salt=randomBytes(16).toString("hex");
   const hashpass=createHmac("sha256",salt)
   .update(user.password)
   .digest("hex");
   this.salt=salt,
   this.password=hashpass;
   next();

})
userSchema.statics.matchPassword=async function (email,password) {
    const user=await this.findOne({email});
    if(!user) {
       return null;

    }
    const salt=user.salt;
    const hashpass=user.password;
    const userProvideHash=createHmac("sha256",salt)
    .update(password)
    .digest("hex");
    if(userProvideHash!==hashpass) return null;
    return user;


}



const User=mongoose.model("User",userSchema);
module.exports=User;