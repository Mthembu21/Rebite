const mongoose = require("mongoose");


const RequestSchema = mongoose.Schema({
    donation: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    requestor:{
        type: mongoose.Schema.Types.ObjectId
    },
    status:{
        type: String,
        default: "pending",
    }
})

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;