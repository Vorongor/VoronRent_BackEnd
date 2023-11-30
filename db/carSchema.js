const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fuelConsumption: {
    type: String,
    required: true,
  },
  engineSize: {
    type: String,
    required: true,
  },
  accessories: {
    type: [String],
    required: true,
  },
  functionalities: {
    type: [String],
    required: true,
  },
  rentalPrice: {
    type: Number,
    required: true,
  },
  rentalCompany: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  rentalConditions: {
    type: String,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
