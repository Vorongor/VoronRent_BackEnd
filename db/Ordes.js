const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  startTime: {
    type: Number,
    required: true,
  },
  finishTime: {
    type: Number,
    required: true,
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const Order = mongoose.model("Order", orderSchema);

module.exports = {
  Order,
};
