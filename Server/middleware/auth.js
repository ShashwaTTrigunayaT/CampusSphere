const { validate } = require("../models/user");
const { validateToken } = require("../service/auth");

function checkForAuth(cookieName) {
    console.log(`Checking for auth cookie: ${cookieName}`);
   return function(req, res, next) { 
    const cookieTokenValue=req.cookies[cookieName];
    
    if (!cookieTokenValue) {
      return next();
    }
    try {
      const userPayload=validateToken(cookieTokenValue);
      req.user=userPayload;
      
    } catch (error) {
      return next();
    }
    return next();
  }
  


}
module.exports={
  checkForAuth,  
}