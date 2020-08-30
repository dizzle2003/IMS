const mongoose = require("mongoose");
const { Schema } = mongoose;

const PropertySchema = new Schema({
  property: {
    type: [String],
    enum: ["Apartment", "Duplex", "Bungalow"],
  },
  property_kind: {
    type: [String],
    enum: ["2", "3", "4"],
  },
  position: {
    type: [String],
    enum: ["PG Student", "Faculty Member", "Staff Member"],
    required: true,
  },
  status: {
    type:  [String],
    enum: ["pending", "acknowledged", "closed"] 
},
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
});

module.exports = mongoose.model("Property", PropertySchema);