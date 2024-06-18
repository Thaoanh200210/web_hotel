const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
    {
        // trim: chuỗi kh được có khoảng cách ở đầu cuối, required bắt buộc
        employeeScore: { type: Number, trim: true, required: true },
        sactificationScore: { type: Number, trim: true, required: true },
        wifiScore: { type: Number, trim: true, required: true },
        comfortScore: { type: Number, trim: true, required: true },
        moneyScore: { type: Number, trim: true, required: true },
        cleanlinessScore: { type: Number, trim: true, required: true },
        comment: { type: String, trim: true},
        customer: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "users",
            required: true 
        },
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


ReviewSchema.plugin(require("mongoose-autopopulate"));
const Review = mongoose.model("reviews", ReviewSchema);

module.exports = { Review };