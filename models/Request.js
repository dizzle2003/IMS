const mongoose = require("mongoose");
const { Schema } = mongoose;

const RequestSchema = new Schema({
  service: {
    type: String,
    enum: ["Electricity", "Masonry", "Carpentry", "Plumbing"],
  },
  location: {
    type: String,
  },
  description: {
    type: String,
    minlength: 10,
  },
  property: {
    type: [String],
    enum: ["Apartment", "Duplex", "Bungalow"],
  },
  visitation_time: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: [String],
    enum: ["pending", "acknowledged", "closed"],
    default: "pending",
    required: "true",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: false,
  },
});

module.exports = mongoose.model("Request", RequestSchema);
