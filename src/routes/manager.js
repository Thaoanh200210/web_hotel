const express = require("express");
const multer = require("multer");
const { ManagerController }  = require("../controllers/manager");
const { uploadDisk } = require("../config/multer");

const router = express.Router();
const upload = multer();

const checkRole = (req, res, next) => {
    const role = req.cookies.user_role;
    if (role === 'employee') {
        next(); 
    } else {
        res.render("../views/manager/404/index.ejs")
    }
};

let manager = new ManagerController();
//thống kê
router.route("/statistical")
    .get(checkRole, manager.statistical) // Chèn middleware vào đây
    .post(checkRole, manager.statistical); // Chèn middleware vào đây cho cả POST


router.route('/hotel/edit-handler').post(uploadDisk.single('file'), manager.editHotelHandler);
router.route("/hotel/edit").get(checkRole, manager.editHotel);
router.route("/hotel").get(checkRole, manager.hotel);

// quản lý phòng
router.route("/room/add-handler").post(upload.fields([
    {
        name:"hinhanh"
    }
]) ,manager.addRoomHandler);
router.route("/room/add").get(checkRole, manager.addRoom);
router.route("/room/edit-handler/:id").post(upload.fields([
    {
        name:"hinhanh"
    }
]) ,manager.editRoomHandler);
router.route("/room/edit/:id").get(checkRole, manager.editRoom);
router.route("/room/delete/:id").get(checkRole, manager.deleteRoomHandler);
router.route("/room/detail/:id").get(checkRole, manager.roomDetail);
router.route("/room").get(checkRole, manager.room);


// //quản lý lựa chọn
// router.route("/selection/add-handler").post(manager.addSelectionHandler);
// router.route("/selection/add").get(manager.addSelection);
// router.route("/selection/edit-handler/:id").post(manager.editSelectionHandler);
// router.route("/selection/edit/:id").get(manager.editSelection);
// router.route("/selection/delete/:id").get(manager.deleteSelectionHandler);
// router.route("/selection").get(manager.selection);

//quản lý loại phòng
router.route("/type_room/add-handler").post(checkRole, manager.addTypeRoomHandler);
router.route("/type_room/add").get(checkRole, manager.addTypeRoom);
router.route("/type_room/edit-handler/:id").post(checkRole, manager.editTypeRoomHandler);
router.route("/type_room/edit/:id").get(checkRole, manager.editTypeRoom);
router.route("/type_room/delete/:id").get(checkRole, manager.deleteTypeRoomHandler);
router.route("/type_room").get(checkRole, manager.TypeRoom);

// quan ly co so vat chat
router.route("/service/add-handler").post(checkRole, manager.addServiceHandler);
router.route("/service/add").get(checkRole, manager.addService);
router.route("/service/edit-handler/:id").post(checkRole, manager.editServiceHandler);
router.route("/service/edit/:id").get(checkRole, manager.editService);
router.route("/service/delete/:id").get(checkRole, manager.deleteServiceHandler);
router.route("/service").get(checkRole, manager.service);



//quan ly dich vu (vd: xe, nuoc, do an)
router.route("/service_hotel/add-handler").post(checkRole, manager.addServiceHotelHandler);
router.route("/service_hotel/add").get(checkRole, manager.addServiceHotel);
router.route("/service_hotel/edit-handler/:id").post(checkRole, manager.editServiceHotelHandler);
router.route("/service_hotel/edit/:id").get(checkRole, manager.editServiceHotel);
router.route("/service_hotel/delete/:id").get(checkRole, manager.deleteServiceHotelHandler);
router.route("/service_hotel").get(checkRole, manager.ServiceHotel);


// quản lý sự kiện khuyến mãi
router.route("/event/add").get(checkRole, manager.addEvent);
router.route("/event/add-handler").post(checkRole, manager.addEventHandler);
router.route("/event/edit-handler/:id").post(checkRole, manager.editEventHandler);
router.route("/event/edit/:id").get(checkRole, manager.editEvent);
router.route("/event/delete/:id").get(checkRole, manager.deleteEventHandler);
router.route("/event").get(checkRole, manager.event);

// quản lý sự kiện giảm giá
router.route("/discount/add").get(checkRole, manager.addDiscount);
router.route("/discount/add-handler").post(checkRole, manager.addDiscountHandler);
router.route("/discount/edit-handler/:id").post(checkRole, manager.editDiscountHandler);
router.route("/discount/edit/:id").get(checkRole, manager.editDiscount);
router.route("/discount/delete/:id").get(checkRole, manager.deleteDiscountHandler);
router.route("/discount").get(checkRole, manager.discount);

// quản lý nhân viên
router.route("/user/employee/add-handler").post(checkRole, manager.addEmployeeHandler);
router.route("/user/employee/add").get(checkRole, manager.addEmployee);
router.route("/user/employee/edit-handler/:id").post(checkRole, manager.editEmployeeHandler);
router.route("/user/employee/edit/:id").get(checkRole, manager.editEmployee);
router.route("/user/employee/delete/:id").get(checkRole, manager.deleteEmployeeHandler);
router.route("/user/employee").get(checkRole, manager.employee);

// quản lý khách hàng
router.route("/user/customer/add-handler").post(checkRole, manager.addCustomerHandler);
router.route("/user/customer/add").get(checkRole, manager.addCustomer);
router.route("/user/customer/edit-handler/:id").post(checkRole, manager.editCustomerHandler);
router.route("/user/customer/edit/:id").get(checkRole, manager.editCustomer);
router.route("/user/customer/delete/:id").get(checkRole, manager.deleteCustomerHandler);
router.route("/user/customer").get(checkRole, manager.customer);

//quản lý đặt phòng
router.route("/booking/status_booking/:id/service_hotel/delete/:id").get(checkRole, manager.deleteserviceHotelBookingHandler);
router.route("/booking/status_booking/:id/kiemtra").get(checkRole, manager.findRoomEmpty);
router.route("/booking/status_booking/:id/add-handler").post(checkRole, manager.addBookingHandler);
router.route("/booking/status_booking/:id/add").get(checkRole, manager.addBooking);
router.route("/booking/status_booking/:id/service_hotel").get(checkRole, manager.serviceHotelBooking);
router.route("/booking/status_booking/:id/service_hotel/add-handler-service-quantity").post(checkRole, manager.addHandlerServiceQuantity);
router.route("/booking/status_booking/:id").get(checkRole, manager.editBookingStatus).post(checkRole, manager.editStatusBookingHandler);


router.route("/booking").get(checkRole, manager.booking);


//quản lý đánh giá
router.route("/review/:id").get(checkRole, manager.reviewDetail);
router.route("/review/delete/:id").get(checkRole, manager.deleteReviewHandler);

router.route("/review").get(checkRole, manager.review);


module.exports = router;