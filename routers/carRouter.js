const express = require("express");
const router = express.Router();
const carController = require("./conrtollers/carController");
const { passportAuthenticate } = require("../midlewares/pasportJWT");
// const { passportAuthenticate } = require("../midlewares/pasportJWT");
// const multer = require("multer");

// const upload = multer({ dest: "uploads/" });

router.get("/", carController.getAllCar);
router.get("/search", carController.getSearchedCar);
router.post("/add", passportAuthenticate, carController.addOrder);
router.get("/order", passportAuthenticate, carController.getOrders);
router.delete(
  "/delete/:orderId",
  passportAuthenticate,
  carController.deleteOrders
);

// router.post(
//   "/avatar/upload",
//   passportAuthenticate,
//   upload.single("avatar"),
//   userController.uploadAvatar
// );

module.exports = router;
