const express = require("express");
const router = express.Router();
const authController = require("./conrtollers/authControler");
const { passportAuthenticate } = require("../midlewares/pasportJWT");
// const multer = require("multer");

// const upload = multer({ dest: "uploads/" });

router.get("/", authController.checConect);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/loguot", passportAuthenticate, authController.logout);
router.post("/refresh", passportAuthenticate, authController.refreshUser);

// router.post(
//   "/avatar/upload",
//   passportAuthenticate,
//   upload.single("avatar"),
//   userController.uploadAvatar
// );

module.exports = router;
