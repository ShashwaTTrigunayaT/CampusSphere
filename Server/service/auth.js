const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); 

function validateToken(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, process.env.SECRET);
    } catch (error) {
        return null; 
    }
}

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists with this email" });
    }

    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = crypto
      .createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    await User.create({
      name,
      email,
      password: hashedPassword,
      salt: salt,
    });

    return res.status(201).json({
      message: "User created successfully",
    });

  } catch (error) {
    console.error("Error in handleUserSignup:", error);
    if (error.code === 11000) {
        return res.status(409).json({ message: "User already exists with this email" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function handleUserSignin(req, res) {
  try {
    // Log 1: Function starts
    console.log("[SIGNIN DEBUG] 1/7: Controller started.");
    const { email, password } = req.body;
    
    // Log 2: Show incoming data (but not password)
    console.log(`[SIGNIN DEBUG] 2/7: Received email: ${email}`);

    if (!email || !password) {
        console.error("[SIGNIN DEBUG] FAILED: Email or password missing.");
        return res.status(400).json({ error: "Please provide email and password" });
    }

    // Log 3: Before database call
    console.log("[SIGNIN DEBUG] 3/7: Calling User.matchPassword...");
    const user = await User.matchPassword(email, password);
    
    // Log 4: After database call
    console.log(`[SIGNIN DEBUG] 4/7: User.matchPassword returned: ${user ? user._id : 'null'}`);

    if (!user) {
        console.warn("[SIGNIN DEBUG] FAILED: Invalid email or password (user is null).");
       return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Log 5: Before token creation
    console.log("[SIGNIN DEBUG] 5/7: Calling createUserToken...");
    const token = createUserToken(user);
    
    // Log 6: After token creation
    console.log(`[SIGNIN DEBUG] 6/7: Token created: ${token ? 'OK' : 'FAILED'}`);

    if (!token) {
        console.error("[SIGNIN DEBUG] FAILED: Token creation returned null/undefined.");
        return res.status(500).json({ error: 'Error creating token' });
    }

    const name = user.name;
    const profileImageURL = user.profileImageURL;
    const eventData = { alerts: user.alerts, bookmarks: user.bookmarks };

    // Log 7: Before sending final response
    console.log("[SIGNIN DEBUG] 7/7: Success. Sending cookie and JSON response.");

    // === CRITICAL FIX: CHAIN THE RESPONSE ===
    return res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    .status(200) // Chain the status
    .json({ // Chain the json
        message: "Login successful", 
        token, 
        name, 
        profileImageURL, 
        email: user.email, 
        eventData 
    });
    // =======================================

  } catch (error) {
    // Log 8: The CRITICAL catch block
    console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.error("[SIGNIN DEBUG] FATAL CATCH BLOCK ERROR:", error);
    console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    return res.status(500).json({ error: 'Internal server error' });
  }
}

 function createUserToken(user) {
    const Payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    };
    const token = jwt.sign(Payload, process.env.SECRET, { expiresIn: "7d" });
    return token;
}
 
module.exports = {
  handleUserSignup,
  handleUserSignin,
  createUserToken,
  validateToken, 
};