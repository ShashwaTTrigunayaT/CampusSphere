const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/user");
const fetchCodeforcesEvents = require("./codeforcesfetcher");


async function handleUserSignup(req, res) {
    const { name, email, password, college } = req.body;
    await User.create({
        name,
        email,
        password,
        college,
    })
    return res.status(201).json({
        message: "User Created Successfully"
    })

}
async function handleUserSignin(req, res) {
    
    console.log("Signin request received");
    const { email, password } = req.body;
    const user = await User.matchPassword(email, password);
     if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = createUserToken(user);
   
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,       // set true only in production (HTTPS)
            sameSite: "lax",     // "none" if frontend & backend are on different domains
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
       const name=user.name;
       const profileImageURL=user.profileImageURL;


        res.status(200).json({ message: "Login successful", token,name,profileImageURL,email });
        console.log(`User signed in: ${email}`);

    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

}
 function createUserToken(user) {
    const Payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    };
    const token = jwt.sign(Payload, process.env.SECRET);
    return token;
}
 function validateToken(token) {
    
    

    try {
        const Payload = jwt.verify(token, process.env.SECRET);
        return Payload;
    } catch (error) {
       
        return null;
    }
}


module.exports = {
    handleUserSignup,
    handleUserSignin,
    createUserToken,
    validateToken,

}