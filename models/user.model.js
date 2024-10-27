const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


const UserSchemma = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the company name"],
        unique: [true, "This user is already registered"]
    },
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
    },
    description: {
        type: String,
        required: [true, "Please provide the us with your company description"]
    },
    image: {
        type: String,
        required: false,
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