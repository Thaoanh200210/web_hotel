const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DetailBookingSchema = new Schema(
    {
        // trim: chuỗi kh được có khoảng cách ở đầu cuối, required bắt buộc
        original_price: { type: String, trim: true, required: true },
        discount_price: { type: Number, trim: true, required: true },
        booking: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "bookings",
            required: true 
        },
        room: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "rooms",
            required: true 
        },
        deleteAt: {type:Date},
    },
    { versionKey: false }
);


DetailBookingSchema.plugin(require("mongoose-autopopulate"));
const DetailBooking = mongoose.model("detail_bookings", DetailBookingSchema);

module.exports = { DetailBooking };