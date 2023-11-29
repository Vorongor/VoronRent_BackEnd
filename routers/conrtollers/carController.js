const Car = require("../../db/carSchema");
const HttpError = require("../../midlewares/HttpError");

const getAllCar = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 12;

    const startIndex = (page - 1) * pageSize;

    const result = await Car.find().skip(startIndex).limit(pageSize);

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
};
