const bcrypt = require("bcrypt");
// const { HttpError } = require("../../helpers/index");
const HttpError = require("../../midlewares/HttpError");
const { User } = require("../../db/userSchema");
const {
  validateNewUser,
  validateUser,
  sanitizeUser,
} = require("../../midlewares/authMid");
const {
  generateToken,
  generateRefreshToken,
  verifyToken,
} = require("../../midlewares/pasportJWT");

const checConect = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "server work / conect compleated",
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const { error } = validateNewUser({ name, email, password });

    if (error) {
      throw HttpError(400, error.details[0].message);
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw HttpError(409, "Email already in use, try login with it");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(201).json({
      message: "New user has been create successfully",
      token: token,
      refreshToken: refreshToken,
      userId: user._id,
      user: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { error } = validateUser({ email, password });

    if (error) {
      throw HttpError(400, error.details[0].message);
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw HttpError(401, "Invalid credentials, check yor email or password");
    }

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(200).json({
      message: "User has been login successfully",
      token: token,
      refreshToken: refreshToken,
      userId: user._id,
      user: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      throw HttpError(401, "Token is invalid, please try login again");
    }

    const user = await User.findOne({ _id: decodedToken.userId });
    if (!user) {
      throw HttpError(401, "Not authorized");
    }
    res.status(204).json({ message: "Successful Log Out" });
  } catch (error) {
    next(error);
  }
};

const refreshUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      throw HttpError(400, "RefreshToken is invalid");
    }
    const user = await User.findOne({ _id: decodedToken.userId });
    if (!user) {
      throw HttpError(400, "Invalid token try login again");
    }

    const newToken = generateToken(user);
    const newRefreshToken = generateRefreshToken(user);
    res.status(200).json({
      message: "user succesfully refresh",
      token: newToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checConect,
  register,
  login,
  logout,
  refreshUser,
};
