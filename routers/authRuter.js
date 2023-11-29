const express = require("express");
const router = express.Router();
// const { passportAuthenticate } = require("./midleware/auth");
const authController = require("./conrtollers/authControler");
// const multer = require("multer");

// const upload = multer({ dest: "uploads/" });

router.get("/", authController.checConect);

// router.post(
//   "/avatar/upload",
//   passportAuthenticate,
//   upload.single("avatar"),
//   userController.uploadAvatar
// );

module.exports = router;
