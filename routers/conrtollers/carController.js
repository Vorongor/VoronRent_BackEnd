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

    if (!result) {
      throw HttpError(404, "Not Found!");
    }
    res.json({
      status: "success",
      code: 200,
      page,
      pageSize,
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
