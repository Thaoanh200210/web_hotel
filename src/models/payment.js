const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
    {
        // trim: chuỗi kh được có khoảng cách ở đầu cuối, required bắt buộc
        type: { type: String, trim: true, required: true },
        is_success: { type: String, trim: true, required: true },
        booking: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "bookings",
            required: true 
        },
        deleteAt: {type:Date},
    },
    { versionKey: false }
);


PaymentSchema.plugin(require("mongoose-autopopulate"));
const Payment = mongoose.model("payments", PaymentSchema);

module.exports = { Payment };