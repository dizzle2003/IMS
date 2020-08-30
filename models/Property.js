const mongoose = require("mongoose");
const { Schema } = mongoose;

const PropertySchema = new Schema({
  property: {
    type: [String],
    enum: ["Apartment", "Duplex", "Bungalow"],
    required: true
  },
  kind: {
    type: [String],
    enum: ["2br", "3br", "4br"],
    required: true
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

//Hide Position from being returned in Property Object
PropertySchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.position;
    return obj;
  }

module.exports = mongoose.model("Property", PropertySchema);