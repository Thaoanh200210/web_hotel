const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {BookingStatusEnum} = require("./enum/booking_status");

const BookingSchema = new Schema(
    {
        // trim: chuỗi kh được có khoảng cách ở đầu cuối, required bắt buộc
        customer: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "users",
            required: true 
        },
        check_in: { type: Date, trim: true, required: true },
        check_out: { type: Date, trim: true, required: true },
        total_price: { type: String, trim: true, required: true },
        customer_identify_number: { type: String, trim: true, required: true },
        deleteAt: {type:Date},
        status: { type: String , trim: true, default: BookingStatusEnum.Reserved},
    },
    { versionKey: false }
);


// thư viện tự động lấy dữ liệu liên quan 
BookingSchema.plugin(require("mongoose-autopopulate"));
const Booking = mongoose.model("bookings", BookingSchema);

module.exports = { Booking };