


// This file is in your 'middleware' folder

// 1. Import 'validateToken' from the correct service file
const { validateToken } = require("../service/auth"); 

// This middleware checks for a user and attaches them to req.user
// but does NOT block the request if they're not logged in.
// Use this for public pages (Home, About, etc.)
function checkForAuth(cookieName) {
   return function(req, res, next) { 
     // Log 1: Middleware starts
     console.log(`[AUTH DEBUG] 1/4: checkForAuth middleware started for path: ${req.path}`);

    const cookieTokenValue = req.cookies[cookieName];
    
     // Log 2: Check for token
     console.log(`[AUTH DEBUG] 2/4: Token cookie found? ${cookieTokenValue ? 'Yes' : 'No'}`);

    if (!cookieTokenValue) {
      req.user = null; // Make sure req.user is null if no token
      console.log("[AUTH DEBUG] 3/4: No token. Setting req.user = null and proceeding.");
      return next();
    }

    // 2. Validate the token
    const userPayload = validateToken(cookieTokenValue);
    
     // Log 3: Log validation result
     console.log(`[AUTH DEBUG] 3/4: Token validation result: ${userPayload ? 'Valid (User ID: ' + userPayload._id + ')' : 'Invalid'}`);

    // 3. Attach payload or null to the request
    req.user = userPayload; 
    
     // Log 4: Proceeding to next middleware/route
     console.log("[AUTH DEBUG] 4/4: Attaching user to req and proceeding.");
    return next();
  }
}

// --- 4. NEW SECURE MIDDLEWARE ---
// This middleware ENFORCES that a user must be logged in.
// Use this on your protected routes (profile, bookmarks, alerts, etc.)
function isLoggedIn(cookieName = "token") {
  return function(req, res, next) {
    const cookieTokenValue = req.cookies[cookieName];
    
    if (!cookieTokenValue) {
      // No token, send 401 Unauthorized
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const userPayload = validateToken(cookieTokenValue);
    
    if (!userPayload) {
      // Token is invalid or expired, send 401
      return res.status(401).json({ message: "Access denied. Invalid token." });
    }

    // User is valid, attach payload and proceed
    req.user = userPayload;
    return next();
  }
}

module.exports = {
  checkForAuth,
  isLoggedIn, // <-- Export the new, secure middleware
}