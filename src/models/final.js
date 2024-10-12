const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FinalSchema = new Schema(
    {
        // trim: chuỗi kh được có khoảng cách ở đầu cuối, required bắt buộc
        final_price: { type: String, trim: true, required: true },
        NowDate: {type: Date, trim: true, required: true},
        detail: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "detail_bookings",
            required: true 
        },
        nhanvien: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "users",
            required: true 
        },
        deleteAt: {type:Date},
    },
    { versionKey: false }
);


FinalSchema.plugin(require("mongoose-autopopulate"));
const Final = mongoose.model("finals", FinalSchema);

module.exports = { Final };