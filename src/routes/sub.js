const express = require("express");
const multer = require("multer");
const { SubController }  = require("../controllers/sub");
const { uploadDisk } = require("../config/multer");

const router = express.Router();
const upload = multer();

let sub = new SubController();


// quản lý phòng
router.route("/room/add-handler").post(upload.fields([
    {
        name:"hinhanh"
    }
]) ,sub.addRoomHandler);
router.route("/room/add").get(sub.addRoom);
router.route("/room/edit-handler/:id").post(upload.fields([
    {
        name:"hinhanh"
    }
]) ,sub.editRoomHandler);
router.route("/room/edit/:id").get(sub.editRoom);
router.route("/room/delete/:id").get(sub.deleteRoomHandler);
router.route("/room/detail/:id").get(sub.roomDetail);
router.route("/room").get(sub.room);


// quản lý sự kiện giảm giá
router.route("/discount/add").get(sub.addDiscount);
router.route("/discount/add-handler").post(sub.addDiscountHandler);
router.route("/discount/edit-handler/:id").post(sub.editDiscountHandler);
router.route("/discount/edit/:id").get(sub.editDiscount);
router.route("/discount/delete/:id").get(sub.deleteDiscountHandler);
router.route("/discount").get(sub.discount);


// quản lý khách hàng
router.route("/customer/add-handler").post(sub.addCustomerHandler);
router.route("/customer/add").get(sub.addCustomer);
router.route("/customer/edit-handler/:id").post(sub.editCustomerHandler);
router.route("/customer/edit/:id").get(sub.editCustomer);
router.route("/customer/delete/:id").get(sub.deleteCustomerHandler);
router.route("/customer").get(sub.customer);

//quản lý đặt phòng

router.route("/booking/status_booking/:id/service_hotel/delete/:id").get(sub.deleteserviceHotelBookingHandler);
router.route("/booking/status_booking/:id/kiemtra").get(sub.findRoomEmpty);
router.route("/booking/status_booking/:id/add-handler").post(sub.addBookingHandler);
router.route("/booking/status_booking/:id/add").get(sub.addBooking);
router.route("/booking/status_booking/:id/service_hotel").get(sub.serviceHotelBooking);
router.route("/booking/status_booking/:id/service_hotel/add-handler-service-quantity").post(sub.addHandlerServiceQuantity);
router.route("/booking/status_booking/:id").get(sub.editBookingStatus).post(sub.editStatusBookingHandler);
router.route("/booking").get(sub.booking);

//quản lý đánh giá
router.route("/review/:id").get(sub.reviewDetail);
router.route("/review").get(sub.review);


module.exports = router;