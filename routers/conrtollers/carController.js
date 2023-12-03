const Car = require("../../db/carSchema");
const HttpError = require("../../midlewares/HttpError");
const { User } = require("../../db/userSchema");
const { validateNewOrder } = require("../../midlewares/authMid");
const { Order } = require("../../db/Ordes");

const getAllCar = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let pageSize = 12 * page;
    const maxSize = await Car.countDocuments();

    if (pageSize >= maxSize) {
      pageSize = maxSize;
    }

    const result = await Car.find().limit(pageSize);

    const uniqueBrands = await Car.distinct("make");
    const uniquePrices = await Car.distinct("rentalPrice");
    const uniqueCompany = await Car.distinct("rentalCompany");

    if (!result) {
      throw HttpError(404, "Not Found!");
    }
    res.json({
      status: "success",
      code: 200,
      makes: uniqueBrands,
      prices: uniquePrices,
      rentalCompany: uniqueCompany,
      maxSize,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSearchedCar = async (req, res, next) => {
  try {
    const make = req.query.make;
    const rentalPrice = req.query.rentalPrice;
    const milageFrom = parseInt(req.query.milageFrom);
    const milageTo = parseInt(req.query.milageTo);

    const query = {};
    if (make) {
      query.make = {
        $regex: new RegExp(make, "i"),
      };
    }

    if (rentalPrice) {
      query.rentalPrice = { $lte: rentalPrice };
    }

    if (!isNaN(milageFrom)) {
      query.mileage = { $gte: milageFrom };
    }

    if (!isNaN(milageTo)) {
      query.mileage = { ...query.mileage, $lte: milageTo };
    }

    const result = await Car.find(query);

    if (!result) {
      throw HttpError(404, "Not Found!");
    }
    res.json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const addOrder = async (req, res, next) => {
  try {
    const { orderNumber, client, contact, startTime, finishTime } = req.body;
    const userId = req.user._id;

    const { error } = validateNewOrder({
      orderNumber,
      client,
      contact,
      startTime,
      finishTime,
      carId,
    });
    if (error) {
      throw HttpError(400, error.details[0].message);
    }

    const newOrder = await Order.create({
      orderNumber: orderNumber,
      client: client,
      contact: contact,
      startTime: startTime,
      finishTime: finishTime,
      carId: carId,
      owner: userId,
    });

    res.json({
      status: "success",
      code: 200,
      orders: newOrder,
    });
  } catch (error) {
    next(error);
  }
};
const getOrders = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const userOrders = await Order.find({ owner: userId });

    res.json({
      status: "success",
      code: 200,
      orders: userOrders,
    });
  } catch (error) {
    next(error);
  }
};

const deleteOrders = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const userId = req.user._id;

    const order = await Order.findOneAndDelete({ _id: orderId, owner: userId });

    if (!order) {
      throw HttpError(404, "Order not found");
    }

    res.json({
      status: "success",
      code: 200,
      order: order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCar,
  getSearchedCar,
  addOrder,
  getOrders,
  deleteOrders,
};
