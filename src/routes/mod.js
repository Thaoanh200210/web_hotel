const express = require("express");
const multer = require("multer");
const { ModController }  = require("../controllers/mod");
const { uploadDisk } = require("../config/multer");
const router = express.Router();

let mod = new ModController();


//city
router.route("/city/edit/:id").get(mod.editCity);
router.route('/city/add-handler').post(uploadDisk.single('file'), mod.addCityHandler);
router.route('/city/edit-handler/:id').post(uploadDisk.single('file'), mod.editCityHandler);
router.route("/city/delete/:id").get(mod.deleteCityHandler);
router.route("/city/add").get(mod.addCity);
router.route("/city").get(mod.city);


//hotel
router.route("/hotel/edit-handler/:id").post(mod.editHotelHandler);
router.route("/hotel/activate/:id").get(mod.activateHotelHandler);
router.route("/hotel/negate/:id").get(mod.negateHotelHandler);
router.route("/hotel/delete/:id").get(mod.deleteHotelHandler);
router.route("/hotel/add-handler").post(mod.addHotelHandler);
router.route("/hotel/add").get(mod.addHotel);
router.route("/hotel").get(mod.hotel);

module.exports = router;