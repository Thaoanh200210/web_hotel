const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscountSchema = new Schema(
    {
        // trim: chuỗi kh được có khoảng cách ở đầu cuối, required bắt buộc
        name: { type: String, trim: true, required: true },
        hotel: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "hotels",
            required: true 
        },
        type_room: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "type_rooms",
            required: true 
        },
        discount_percent: { type: Number, trim: true, required: true }, 
        date_start: { type: Date, trim: true, required: true },
        date_end: { type: Date, trim: true, required: true },   
        deleteAt: {type:Date},   
    },
    { versionKey: false }
);

DiscountSchema.plugin(require("mongoose-autopopulate"));
const Discount = mongoose.model("Discounts", DiscountSchema);

module.exports = { Discount };