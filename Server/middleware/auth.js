


const { validateToken } = require("../service/auth"); 




function checkForAuth(cookieName) {
   return function(req, res, next) { 
    const cookieTokenValue = req.cookies[cookieName];
    
    if (!cookieTokenValue) {
      req.user = null; 
      return next();
    }

    
    const userPayload = validateToken(cookieTokenValue);
    
    
    
    req.user = userPayload; 
    
    return next();
  }
}




function isLoggedIn(cookieName = "token") {
  return function(req, res, next) {
    const cookieTokenValue = req.cookies[cookieName];
    
    if (!cookieTokenValue) {
      
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const userPayload = validateToken(cookieTokenValue);
    
    if (!userPayload) {
      
      return res.status(401).json({ message: "Access denied. Invalid token." });
    }

    
    req.user = userPayload;
    return next();
  }
}

module.exports = {
  checkForAuth,
  isLoggedIn, 
}