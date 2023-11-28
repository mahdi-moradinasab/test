const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config= require('../config/config')

const userSchema = new mongoose.Schema({
    fname: { type: String },
    lname: { type: String },
    role: { type: String, default: "USER" },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

userSchema.methods.generateAuthToken =  ({id, email,role}) => {
    const token = jwt.sign({ id,email,role}, config.secret);
    return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
