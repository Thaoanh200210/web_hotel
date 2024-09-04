const express = require("express");
const multer = require("multer");
const { ManagerController }  = require("../controllers/manager");
const { uploadDisk } = require("../config/multer");

const router = express.Router();
const upload = multer();

let manager = new ManagerController();
//thống kê
router.route("/statistical").get(manager.statistical);

router.route('/hotel/edit-handler').post(uploadDisk.single('file'), manager.editHotelHandler);
router.route("/hotel/edit").get(manager.editHotel);
router.route("/hotel").get(manager.hotel);

// quản lý phòng
router.route("/room/add-handler").post(upload.fields([
    {
        name:"hinhanh"
    }
]) ,manager.addRoomHandler);
router.route("/room/add").get(manager.addRoom);
router.route("/room/edit-handler/:id").post(upload.fields([
    {
        name:"hinhanh"
    }
]) ,manager.editRoomHandler);
router.route("/room/edit/:id").get(manager.editRoom);
router.route("/room/delete/:id").get(manager.deleteRoomHandler);
router.route("/room/detail/:id").get(manager.roomDetail);
router.route("/room").get(manager.room);


// //roomfix
// router.route("/roomfix/add").get(manager.addRoomFix);
// router.route("/roomfix/add-handler").post(manager.addRoomFixHandler);
// router.route("/roomfix/edit-handler/:id").post(manager.editRoomFixHandler);
// router.route("/roomfix/edit/:id").get(manager.editRoomFix);
// router.route("/roomfix/delete/:id").get(manager.deleteRoomFixHandler);
// router.route("/roomfix").get(manager.roomFix);

// quản lý sự kiện khuyến mãi
router.route("/event/add").get(manager.addEvent);
router.route("/event/add-handler").post(manager.addEventHandler);
router.route("/event/edit-handler/:id").post(manager.editEventHandler);
router.route("/event/edit/:id").get(manager.editEvent);
router.route("/event/delete/:id").get(manager.deleteEventHandler);
router.route("/event").get(manager.event);

// quản lý sự kiện giảm giá
router.route("/discount/add").get(manager.addDiscount);
router.route("/discount/add-handler").post(manager.addDiscountHandler);
router.route("/discount/edit-handler/:id").post(manager.editDiscountHandler);
router.route("/discount/edit/:id").get(manager.editDiscount);
router.route("/discount/delete/:id").get(manager.deleteDiscountHandler);
router.route("/discount").get(manager.discount);

// quản lý nhân viên
router.route("/user/employee/add-handler").post(manager.addEmployeeHandler);
router.route("/user/employee/add").get(manager.addEmployee);
router.route("/user/employee/edit-handler/:id").post(manager.editEmployeeHandler);
router.route("/user/employee/edit/:id").get(manager.editEmployee);
router.route("/user/employee/delete/:id").get(manager.deleteEmployeeHandler);
router.route("/user/employee").get(manager.employee);

// quản lý khách hàng
router.route("/user/customer/add-handler").post(manager.addCustomerHandler);
router.route("/user/customer/add").get(manager.addCustomer);
router.route("/user/customer/edit-handler/:id").post(manager.editCustomerHandler);
router.route("/user/customer/edit/:id").get(manager.editCustomer);
router.route("/user/customer/delete/:id").get(manager.deleteCustomerHandler);
router.route("/user/customer").get(manager.customer);

//quản lý đặt phòng
router.route("/booking/status_booking/:id").get(manager.editBookingStatus).post(manager.editStatusBookingHandler);
router.route("/booking").get(manager.booking);


//quản lý đánh giá
router.route("/review/:id").get(manager.reviewDetail);
router.route("/review").get(manager.review);


module.exports = router;