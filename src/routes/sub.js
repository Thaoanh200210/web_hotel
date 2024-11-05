const express = require("express");
const multer = require("multer");
const { SubController }  = require("../controllers/sub");
const { uploadDisk } = require("../config/multer");

const router = express.Router();
const upload = multer();

let sub = new SubController();

const checkRole = (req, res, next) => {
    const role = req.cookies.user_role;
    if (role === 'sub') {
        next(); 
    } else {
        res.render("../views/manager/404/index.ejs")
    }
};
// quản lý phòng
router.route("/room/add-handler").post(upload.fields([
    {
        name:"hinhanh"
    }
]) ,sub.addRoomHandler);
router.route("/room/add").get(checkRole,sub.addRoom);
router.route("/room/edit-handler/:id").post(upload.fields([
    {
        name:"hinhanh"
    }
]) ,sub.editRoomHandler);
router.route("/room/edit/:id").get(checkRole,sub.editRoom);
router.route("/room/delete/:id").get(checkRole,sub.deleteRoomHandler);
router.route("/room/detail/:id").get(checkRole,sub.roomDetail);
router.route("/room").get(checkRole,sub.room);


// quản lý sự kiện giảm giá
router.route("/discount/add").get(checkRole,sub.addDiscount);
router.route("/discount/add-handler").post(checkRole,sub.addDiscountHandler);
router.route("/discount/edit-handler/:id").post(checkRole,sub.editDiscountHandler);
router.route("/discount/edit/:id").get(checkRole,sub.editDiscount);
router.route("/discount/delete/:id").get(checkRole,sub.deleteDiscountHandler);
router.route("/discount").get(checkRole,sub.discount);


// quản lý khách hàng
router.route("/customer/add-handler").post(checkRole,sub.addCustomerHandler);
router.route("/customer/add").get(checkRole,sub.addCustomer);
router.route("/customer/edit-handler/:id").post(checkRole,sub.editCustomerHandler);
router.route("/customer/edit/:id").get(checkRole,sub.editCustomer);
router.route("/customer/delete/:id").get(checkRole,sub.deleteCustomerHandler);
router.route("/customer").get(checkRole,sub.customer);

//quản lý đặt phòng

router.route("/booking/status_booking/:id/service_hotel/delete/:id").get(checkRole,sub.deleteserviceHotelBookingHandler);
router.route("/booking/status_booking/:id/kiemtra").get(checkRole,sub.findRoomEmpty);
router.route("/booking/status_booking/:id/add-handler").post(checkRole,sub.addBookingHandler);
router.route("/booking/status_booking/:id/add").get(checkRole,sub.addBooking);
router.route("/booking/status_booking/:id/service_hotel").get(checkRole,sub.serviceHotelBooking);
router.route("/booking/status_booking/:id/service_hotel/add-handler-service-quantity").post(checkRole,sub.addHandlerServiceQuantity);
router.route("/booking/status_booking/:id").get(checkRole,sub.editBookingStatus).post(checkRole,sub.editStatusBookingHandler);
router.route("/booking").get(checkRole,sub.booking);

//quản lý đánh giá
router.route("/review/:id").get(checkRole,sub.reviewDetail);
router.route("/review/delete/:id").get(checkRole,sub.deleteReviewHandler);

router.route("/review").get(checkRole,sub.review);


module.exports = router;