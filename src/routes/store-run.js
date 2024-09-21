const express = require("express");
const multer = require("multer");
const { StoreRunController }  = require("../controllers/store-run");
const { Middleware }  = require("../middlewares/index.middleware");
let middleware = new Middleware();
const router = express.Router();

let storeRun = new StoreRunController();
// để hiện tất cả người dùng đánh giá ra màn hình
router.route("/blog").get(storeRun.blog).post(storeRun.blog);
router.route("/myUser").get(storeRun.myUser).post(storeRun.myUser);
router.route("/edit-handler-myUser/:id").get(storeRun.myUserEditHandler).post(storeRun.myUserEditHandler);
// Chuyển qua trang cho phép 1 người dùng đánh giá
router.route("/review/:bookingId").get(storeRun.review).post(storeRun.review);
router.route("/review_handler/:bookingId").post(storeRun.reviewHandler);
router.route("/contact").get(storeRun.contact).post(storeRun.contact);

router.route("/services").get(storeRun.services).post(storeRun.services);
//Show cái trang booking ra
router.route("/hotel/:hotelId/booking-show/:id").all(middleware.getHotel).get(storeRun.booking).post(storeRun.booking);
//Xử lý việc booking
router.route("/hotel/:hotelId/booking-room").all(middleware.getHotel).post(storeRun.bookingHandler);

//Hiện trang room
router.route("/hotel/:hotelId/room").all(middleware.getHotel).get(storeRun.room).post(storeRun.room);
router.route("/hotel/:hotelId/room/:id").all(middleware.getHotel).get(storeRun.roomDetail).post(storeRun.roomDetail);
router.route("/log-out").get(storeRun.logout);

router.route("/historical-booking").get(storeRun.historicalBooking).post(storeRun.historicalBooking);
router.route("/cancel-booking/:bookingId").get(storeRun.cancelBooking);
router.route("/hotels/:cityID").get(storeRun.hotels);
router.route("/hotel").get(storeRun.hotel).post(storeRun.hotel);
router.route("/").get(storeRun.homepage).post(storeRun.homepage);


module.exports = router;