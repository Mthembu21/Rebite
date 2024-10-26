const express = require('express');
const mongoose = require('mongoose');
const User = require("./models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const app = express();
app.use(express.json());


app.get('/' , (req, res) => {
    res.send("Hello from node API");
});


// Endpoint for registration
app.post('/api/users', async (req, res) => {

    try{
        // save the data
        const user = await User.create(req.body);
        res.status(200).json();
    }catch(error) {
        res.status(500).json({message: error.message});
    }
})

// login endpoint
app.post("/api/users/login",  async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    })

    if (user){
        // check password entered weather its correct
        const correct = bcrypt.compareSync(req.body.password, user.password)
        if (correct) {
            // this code block will run if the user provided a valid password
            const token = jwt.sign({
                email: user.email,
                password: user.password
            }, "secret123")
            res.status(200).json({user: token});
        }else{
            // this code block will run if the password provided is invalid
            return res.status(404).json({"not found": "please enter valid login creditials"})
        }
    }else{
        // this code block will run only if 
        return res.status(404).json({"not found": "please enter valid login creditials"})
    }
})

app.get("/api/users", async (req, res) => {
    // the user 
    try {
        const users = await User.find({});
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({message: error.message})
    }

})


app.listen(3000, ()=> {
    mongoose.connect("mongodb://localhost:27017/local")
    .then(() => console.log("Connected")) // if the the connection was successful
    .catch(() => console.log("not connected")); // if there is a connection error
    console.log("Server is running on port 3000");
})

