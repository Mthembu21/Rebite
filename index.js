const express = require('express');
const mongoose = require('mongoose');
const app = express()
require('dotenv').config();

//DB Connection String
dbString = process.env.MONGODB_URI;

//Connect to database
mongoose.connect(dbString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.listen(3000, ()=> {
    console.log("Server is running on port 3000");
})

app.get('/' , (req, res) => {
    res.send("Hello from node API")
});