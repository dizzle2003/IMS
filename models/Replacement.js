const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReplacementSchema = new Schema({
    location: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
		default: 'no-photo.jpg',
    },
    description: {
        type: String,
        required: true,
    },
    visitation: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type:  [String],
        enum: ["pending", "acknowledged", "closed"] 
    }
})

module.exports = mongoose.model("Replacement", ReplacementSchema);