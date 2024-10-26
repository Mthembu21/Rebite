const express = require('express');
const mongoose = require('mongoose');
const app = express()

app.listen(3000, ()=> {
    mongoose.connect("mongodb://localhost:27017/local")
    .then(() => console.log("Connected")) // if the the connection was successful
    .catch(() => console.log("not connected")); // if there is a connection error
    console.log("Server is running on port 3000");
})

app.get('/' , (req, res) => {
    res.send("Hello from node API")
});