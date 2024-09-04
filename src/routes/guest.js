const express = require("express");
const multer = require("multer");
const { GuestController }  = require("../controllers/guest");
const { uploadDisk } = require("../config/multer");

const router = express.Router();
const upload = multer();

let guest = new GuestController();
router.route("/hotel/add-handler").post(uploadDisk.single('file'), guest.addHotelHandler);
router.route("/hotel/add").get(guest.addHotel);
module.exports = router;