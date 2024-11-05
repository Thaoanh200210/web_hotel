const express = require("express");
const multer = require("multer");
const { ModController }  = require("../controllers/mod");
const { uploadDisk } = require("../config/multer");
const router = express.Router();

let mod = new ModController();
const checkRole = (req, res, next) => {
    const role = req.cookies.user_role;
    if (role === 'mod') {
        next(); 
    } else {
        res.render("../views/manager/404/index.ejs")
    }
};

//city
router.route("/city/edit/:id").get(checkRole,mod.editCity);
router.route('/city/add-handler').post(uploadDisk.single('file'), mod.addCityHandler);
router.route('/city/edit-handler/:id').post(uploadDisk.single('file'), mod.editCityHandler);
router.route("/city/delete/:id").get(checkRole,mod.deleteCityHandler);
router.route("/city/add").get(checkRole,mod.addCity);
router.route("/city").get(checkRole,mod.city);


//hotel
router.route("/hotel/edit-handler/:id").post(checkRole,mod.editHotelHandler);
router.route("/hotel/activate/:id").get(checkRole,mod.activateHotelHandler);
router.route("/hotel/negate/:id").get(checkRole,mod.negateHotelHandler);
router.route("/hotel/delete/:id").get(checkRole,mod.deleteHotelHandler);
router.route("/hotel/add-handler").post(checkRole,mod.addHotelHandler);
router.route("/hotel/add").get(checkRole,mod.addHotel);
router.route("/hotel").get(checkRole,mod.hotel);

module.exports = router;