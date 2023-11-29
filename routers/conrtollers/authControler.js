// const bcrypt = require("bcrypt");
// const { HttpError } = require("../../helpers/index");
// const { User } = require("../../db/usersSchema");
// const {
//   generateToken,
//   verifyToken,
//   generateRefreshToken,
//   verifyRefreshToken,
// } = require("../midleware/auth");

// const {
//   validateUser,
//   validateNewUser,
//   sanitizeUser,
// } = require("../midleware/userValidate");

const checConect = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "server work / conect compleated",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checConect,
};
