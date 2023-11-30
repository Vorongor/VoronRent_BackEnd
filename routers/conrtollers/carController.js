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

module.exports = {
  getAllCar,
};
