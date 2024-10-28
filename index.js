const express = require('express');
const mongoose = require('mongoose');
const User = require("./models/user.model.js");
const Donation = require("./models/donation.model.js");
const Request = require("./models/request.model.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

require('dotenv').config()

dbString = process.env.MONGODB_URI;
port = process.env.PORT;

mongoose.connect(dbString, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

const app = express();
app.use(express.json());


app.get('/' , (req, res) => {
    res.send("Hello from node API");
});

// get all the donors
app.get('/api/donors', async (req, res) => {
    // must be logged in to get user to get the donors
    try{
        const token = req.headers['x-access-token']
        const decoded = jwt.verify(token, 'secret123');
        const email = decoded.email;
        console.log(email)
        try{
            const users =  await User.find({
                "type": "donor"
            }).select({name: 1, description: 1}).exec();
            res.status(200).json(users)
        }catch (error){
            res.status(500).json({"error": error.message});
        }
    }catch(error){
        res.status(401).json({message: error.message})
    }
    

})
// get donor by typing a charactors with a pattern that match company's name
app.get('/api/donors/search', async (req, res) => {
    // only search if you are 
    try {
        const donors = await User.find({
            "name": {$regex :".*" + req.query.name + ".*"}, 
            "type": "donor"
        }).select({_id: 1, name: 1, description: 1}).limit(10).exec();
        res.status(200).json(donors)
    }catch(error) {
        res.status(400).json({message: error.message})
    }
} )


// Endpoint for registration
app.post('/api/users/register', async (req, res) => {

    try{
        // save the data
        const user = await User.create(req.body);
        res.status(200).json({message: "user successfully registered"});
    }catch(error) {
        res.status(500).json({message: error.message});
    }
})

// Endpoint to get donor by Id
app.get('/api/users/donor/:id', async (req, res)=> {

    // make sure that the user is authorised
    try {
        const token = req.headers['x-access-token']
        const decoded = jwt.verify(token, 'secret123');
        try {
            const donor = await User.findById(req.params.id).select({name: 1, id: 1, description: 1, type: 2});
            if (donor.type === "donor" ){
                res.status(200).json(donor);
            }else {
                res.status(404).json({message: "User not found"});
            }
            
        }catch(error){
            res.status(404).json({message: "User not found"});
        }
    }catch(error){
        res.status(401).json({message: error.message})
    }
    // geting the user with the ID


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
                name: user.name,
                email: user.email,
                id: user.id,
                type: user.type
            }, "secret123", {expiresIn: 60*60})// login expires after an hour

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
// this endpoint is for creating a donation
app.post('/api/donation/', async (req, res) => {
    try {
        const token = req.headers['x-access-token']
        const decoded = jwt.verify(token, 'secret123');
        console.log(decoded);
        if (decoded.type === "donor"){
            try{
                // save the data
                const donation = await Donation.create(req.body);
                donation.donator = decoded.id
                donation.save();
                res.status(200).json({message: "A new donation was successfully created"});
            }catch(error) {
                // this code block will run if there was a problem with creating the donation
                res.status(500).json({message: error.message});
            }
        }else{
            res.status(405).json({message: "You are not allowed"});
        }
        
    }catch(error) {
        // this code block will if the user is not logged in
        res.status(401).json({message: error.message})
    }
    
})

// get all donations by ID
app.get("/api/donation/one/:id", async (req, res) => {
    // the user 
    try {
        const  donation = await Donation.findOne({_id: req.params.id});
        res.status(200).json(donation);
    }catch(error){
        res.status(500).json({message:"Donation not found"})
    }
})

app.get("/api/donations", async (req, res) => {
    // the user 
    try {
        const  donations = await Donation.find().select({_id: 1, name: 1, description: 1});
        res.status(200).json(donations);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

// allow user you make requests
app.post('/api/request', async (req, res) => {
    try{
        // get the logged in user
        const token = req.headers['x-access-token']
        const decoded = jwt.verify(token, 'secret123');
        if (decoded.type === "recipient"){
            // save the data
            const request = await Request.create(req.body);
            request.requestor = decoded.id;
            res.status(200).json({message: "request successfully created"});
        }else {
            res.status(405).json({message: "donor not allowed to send a request"});
        }

    }catch(error) {
        res.status(500).json({message: error.message});
    }
})

app.post('/api/user/requests', async (req, res) => {
    try {
        const token = req.headers['x-access-token']
        const decoded = jwt.verify(token, 'secret123');
        // get the donation
        console.log(decoded.type)
        if (decoded.type === "donor"){
            // get all the donations that the donor
            const donations = await Donation.find({donator: decoded.id}).select({_id: 1});
            //  get all the requests that belong to to all the fonations
            const requests =  donations.map(async (x) => await Request.find({donation: x._d}));
            console.log(requests);
            res.status(200).json({message: "works as aspected"});
        }else{
            res.status(405).json({message: "Recieptient not allowed"})
        }
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

app.listen(port, ()=> {
    console.log("Server is running on port 3000");
})

