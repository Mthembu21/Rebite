const mongoose = require("mongoose");


const DonationSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter the name of the item(s) you are donating"]
    },
    quantity: {
        type: Number,
        required: [true, "Enter the quantity of the items(s) you are donating"],
        default: 1
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: [true, "Enter the date that the donation will take place"]
    },
    location: {
        type: String,
        required:[true, "Enter the location where the donation will take place"]
    },
    level: {
        type: String,
        required: [true, "Please specify the level of what you are donating"]
    },
    description: {
        type: String,
        required: [true, "Please provide the description of the item(s) that you will be donating"]
    },
    donator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})


const Donation = mongoose.model("Donation", DonationSchema);

module.exports = Donation;