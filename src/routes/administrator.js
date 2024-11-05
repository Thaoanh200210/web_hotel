const express = require("express");
const multer = require("multer");
const { AdminController }  = require("../controllers/administrator");
const { uploadDisk } = require("../config/multer");
const router = express.Router();

let admin = new AdminController();

const checkRole = (req, res, next) => {
    const role = req.cookies.user_role;
    if (role === 'admin') {
        next(); 
    } else {
        res.render("../views/admin/404/index.ejs")
    }
};

//thống kê
router.route("/statistical").get(checkRole, admin.statistical);

//city
router.route("/city/edit/:id").get(checkRole, admin.editCity);
router.route('/city/add-handler').post(uploadDisk.single('file'), admin.addCityHandler);
router.route('/city/edit-handler/:id').post(uploadDisk.single('file'), admin.editCityHandler);
router.route("/city/delete/:id").get(checkRole, admin.deleteCityHandler);
router.route("/city/add").get(checkRole, admin.addCity);
router.route("/city").get(checkRole, admin.city);


//hotel
router.route("/hotel/edit-handler/:id").post(checkRole, admin.editHotelHandler);
router.route("/hotel/activate/:id").get(checkRole, admin.activateHotelHandler);
router.route("/hotel/negate/:id").get(checkRole, admin.negateHotelHandler);
router.route("/hotel/delete/:id").get(checkRole, admin.deleteHotelHandler);
router.route("/hotel/add-handler").post(checkRole, admin.addHotelHandler);
router.route("/hotel/detail/:id").get(checkRole, admin.hotelDetail);
router.route("/hotel/add").get(checkRole, admin.addHotel);

router.route("/hotel").get(checkRole, admin.hotel);


// //quản lý dịch vụ
// router.route("/service/add-handler").post(admin.addServiceHandler);
// router.route("/service/add").get(admin.addService);
// router.route("/service/edit-handler/:id").post(admin.editServiceHandler);
// router.route("/service/edit/:id").get(admin.editService);
// router.route("/service/delete/:id").get(admin.deleteServiceHandler);
// router.route("/service").get(admin.service);

//quản lý lựa chọn
router.route("/selection/add-handler").post(checkRole, admin.addSelectionHandler);
router.route("/selection/add").get(checkRole, admin.addSelection);
router.route("/selection/edit-handler/:id").post(checkRole, admin.editSelectionHandler);
router.route("/selection/edit/:id").get(checkRole, admin.editSelection);
router.route("/selection/delete/:id").get(checkRole, admin.deleteSelectionHandler);
router.route("/selection").get(checkRole, admin.selection);

// //quản lý loại phòng
// router.route("/type_room/add-handler").post(admin.addTypeRoomHandler);
// router.route("/type_room/add").get(admin.addTypeRoom);
// router.route("/type_room/edit-handler/:id").post(admin.editTypeRoomHandler);
// router.route("/type_room/edit/:id").get(admin.editTypeRoom);
// router.route("/type_room/delete/:id").get(admin.deleteTypeRoomHandler);
// router.route("/type_room").get(admin.TypeRoom);

//quản lý nhân viên
router.route("/user/add-handler").post(checkRole, admin.addUserHandler);
router.route("/user/add").get(checkRole, admin.addUser);
router.route("/user/edit-handler/:id").post(checkRole, admin.editUserHandler);
router.route("/user/edit/:id").get(checkRole, admin.editUser);
router.route("/user/delete/:id").get(checkRole, admin.deleteUserHandler);
router.route("/user").get(checkRole, admin.user);

module.exports = router;