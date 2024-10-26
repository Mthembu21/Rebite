const mongoose = require("mongoose");


const DonationSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter the name of the item(s) you are donating"]
    },
    

})