const Car = require("../../db/carSchema");
const HttpError = require("../../midlewares/HttpError");

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

    if (!result) {
      throw HttpError(404, "Not Found!");
    }
    res.json({
      status: "success",
      code: 200,
      makes: uniqueBrands,
      prices: uniquePrices,
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

module.exports = {
  getAllCar,
  getSearchedCar,
};
