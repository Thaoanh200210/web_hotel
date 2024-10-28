const express = require("express");
const multer = require("multer");
const { AdminController }  = require("../controllers/administrator");
const { uploadDisk } = require("../config/multer");
const router = express.Router();

let admin = new AdminController();

//thống kê
router.route("/statistical").get(admin.statistical);

//city
router.route("/city/edit/:id").get(admin.editCity);
router.route('/city/add-handler').post(uploadDisk.single('file'), admin.addCityHandler);
router.route('/city/edit-handler/:id').post(uploadDisk.single('file'), admin.editCityHandler);
router.route("/city/delete/:id").get(admin.deleteCityHandler);
router.route("/city/add").get(admin.addCity);
router.route("/city").get(admin.city);


//hotel
router.route("/hotel/edit-handler/:id").post(admin.editHotelHandler);
router.route("/hotel/activate/:id").get(admin.activateHotelHandler);
router.route("/hotel/negate/:id").get(admin.negateHotelHandler);
router.route("/hotel/delete/:id").get(admin.deleteHotelHandler);
router.route("/hotel/add-handler").post(admin.addHotelHandler);
router.route("/hotel/add").get(admin.addHotel);
router.route("/hotel").get(admin.hotel);


// //quản lý dịch vụ
// router.route("/service/add-handler").post(admin.addServiceHandler);
// router.route("/service/add").get(admin.addService);
// router.route("/service/edit-handler/:id").post(admin.editServiceHandler);
// router.route("/service/edit/:id").get(admin.editService);
// router.route("/service/delete/:id").get(admin.deleteServiceHandler);
// router.route("/service").get(admin.service);

//quản lý lựa chọn
router.route("/selection/add-handler").post(admin.addSelectionHandler);
router.route("/selection/add").get(admin.addSelection);
router.route("/selection/edit-handler/:id").post(admin.editSelectionHandler);
router.route("/selection/edit/:id").get(admin.editSelection);
router.route("/selection/delete/:id").get(admin.deleteSelectionHandler);
router.route("/selection").get(admin.selection);

// //quản lý loại phòng
// router.route("/type_room/add-handler").post(admin.addTypeRoomHandler);
// router.route("/type_room/add").get(admin.addTypeRoom);
// router.route("/type_room/edit-handler/:id").post(admin.editTypeRoomHandler);
// router.route("/type_room/edit/:id").get(admin.editTypeRoom);
// router.route("/type_room/delete/:id").get(admin.deleteTypeRoomHandler);
// router.route("/type_room").get(admin.TypeRoom);

//quản lý nhân viên
router.route("/user/add-handler").post(admin.addUserHandler);
router.route("/user/add").get(admin.addUser);
router.route("/user/edit-handler/:id").post(admin.editUserHandler);
router.route("/user/edit/:id").get(admin.editUser);
router.route("/user/delete/:id").get(admin.deleteUserHandler);
router.route("/user").get(admin.user);

module.exports = router;