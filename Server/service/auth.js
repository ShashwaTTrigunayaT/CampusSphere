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
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: "Please provide email and password" });
    }

    const user = await User.matchPassword(email, password);
    
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    const token = createUserToken(user);
   
    if (!token) {
        return res.status(500).json({ error: 'Error creating token' });
    }

    res.cookie("token", token, {
        httpOnly: true,
   
    secure: true, 
    
    sameSite: "none", 
    maxAge: 7 * 24 * 60 * 60 * 1000
    });
    
    
    const name=user.name;
    const profileImageURL=user.profileImageURL;
    
    const eventData = { alerts: user.alerts, bookmarks: user.bookmarks };

    res.status(200).json({ message: "Login successful", token, name, profileImageURL, email: user.email, eventData });

  } catch (error) {
    console.error("Error in handleUserSignin:", error);
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