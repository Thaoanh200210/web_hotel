const express = require("express");
const multer = require("multer");
const { ManagerController }  = require("../controllers/manager");
const { uploadDisk } = require("../config/multer");

const router = express.Router();
const upload = multer();

let manager = new ManagerController();
//thống kê
router.route("/statistical").get(manager.statistical).post(manager.statistical);

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


// //quản lý lựa chọn
// router.route("/selection/add-handler").post(manager.addSelectionHandler);
// router.route("/selection/add").get(manager.addSelection);
// router.route("/selection/edit-handler/:id").post(manager.editSelectionHandler);
// router.route("/selection/edit/:id").get(manager.editSelection);
// router.route("/selection/delete/:id").get(manager.deleteSelectionHandler);
// router.route("/selection").get(manager.selection);

//quản lý loại phòng
router.route("/type_room/add-handler").post(manager.addTypeRoomHandler);
router.route("/type_room/add").get(manager.addTypeRoom);
router.route("/type_room/edit-handler/:id").post(manager.editTypeRoomHandler);
router.route("/type_room/edit/:id").get(manager.editTypeRoom);
router.route("/type_room/delete/:id").get(manager.deleteTypeRoomHandler);
router.route("/type_room").get(manager.TypeRoom);

// quan ly co so vat chat
router.route("/service/add-handler").post(manager.addServiceHandler);
router.route("/service/add").get(manager.addService);
router.route("/service/edit-handler/:id").post(manager.editServiceHandler);
router.route("/service/edit/:id").get(manager.editService);
router.route("/service/delete/:id").get(manager.deleteServiceHandler);
router.route("/service").get(manager.service);



//quan ly dich vu (vd: xe, nuoc, do an)
router.route("/service_hotel/add-handler").post(manager.addServiceHotelHandler);
router.route("/service_hotel/add").get(manager.addServiceHotel);
router.route("/service_hotel/edit-handler/:id").post(manager.editServiceHotelHandler);
router.route("/service_hotel/edit/:id").get(manager.editServiceHotel);
router.route("/service_hotel/delete/:id").get(manager.deleteServiceHotelHandler);
router.route("/service_hotel").get(manager.ServiceHotel);


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
router.route("/booking/status_booking/:id/service_hotel/delete/:id").get(manager.deleteserviceHotelBookingHandler);
router.route("/booking/status_booking/:id/kiemtra").get(manager.findRoomEmpty);
router.route("/booking/status_booking/:id/add-handler").post(manager.addBookingHandler);
router.route("/booking/status_booking/:id/add").get(manager.addBooking);
router.route("/booking/status_booking/:id/service_hotel").get(manager.serviceHotelBooking);
router.route("/booking/status_booking/:id/service_hotel/add-handler-service-quantity").post(manager.addHandlerServiceQuantity);
router.route("/booking/status_booking/:id").get(manager.editBookingStatus).post(manager.editStatusBookingHandler);


router.route("/booking").get(manager.booking);


//quản lý đánh giá
router.route("/review/:id").get(manager.reviewDetail);
router.route("/review/delete/:id").get(manager.deleteReviewHandler);

router.route("/review").get(manager.review);


module.exports = router;