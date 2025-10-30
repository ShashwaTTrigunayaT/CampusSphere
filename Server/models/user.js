const mongoose=require("mongoose");
const{createHmac,randomBytes}=require("crypto");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
       default:"user"+Math.floor(Math.random()*10000),
       unique:true,
       sparse:true,
        
        
    },
    institution:{
        default:"Your Institution Name",
        type:String,
       
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    skills:{
         type:String,
         default:"Mention your skills.."
      
    },
    projects:{
       type:String,
       default:"Write down about your projects.."
    },

    password:{
        type:String,
        

        
        
        required:true,
    },
    
    salt:{
        type:String,

        
    },
    profileImageURL:{
        type:String,
        default:"/default-Avatar.png"
    },
    githubURL:{
        type:String,
        
    },
    linkedinURL:{
        type:String,
        
    },
    aboutSelf:{
        type:String,
        maxLength:500,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
    },
    bookmarks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event"
    }],
    alerts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event"
    }]

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