const express = require('express');
const mongoose = require('mongoose');
const User = require("./models/user.model.js");


const app = express();
app.use(express.json());


app.get('/' , (req, res) => {
    res.send("Hello from node API");
});

app.post('/api/users', async (req, res) => {
    try{
        // save the data
        const user = await User.create(req.body);
        res.status(200).json();
    }catch(error) {
        res.status(500).json({message: error.message});
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

