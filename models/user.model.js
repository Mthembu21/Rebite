const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


const UserSchemma = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: [true, "This email is already registered"]
    }, 

    password: {
        type: String,
        required: [true, "Please provide the password"]
    },

    type: {
        type: String,
        required: [true, "Please provide the user type"]
    }

});

// Encrpting password before saving
UserSchemma.pre('save', async function(next) {
    if (!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

const User = mongoose.model("User", UserSchemma);

module.exports = User;