const express = require("express");
const router = express.Router();
const carController = require("./conrtollers/carController");
// const { passportAuthenticate } = require("../midlewares/pasportJWT");
// const multer = require("multer");

// const upload = multer({ dest: "uploads/" });

router.get("/", carController.getAllCar);

// router.post(
//   "/avatar/upload",
//   passportAuthenticate,
//   upload.single("avatar"),
//   userController.uploadAvatar
// );

module.exports = router;
