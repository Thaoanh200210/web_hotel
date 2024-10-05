const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceHotelSchema = new Schema(
    {
        // trim: chuỗi kh được có khoảng cách ở đầu cuối, required bắt buộc
        name: { type: String, trim: true, required: true },
        description: { type: String, trim: true, required: true },
        price:{ type: String, trim: true, required: true },
        hotel: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "hotels",
            required: true 
        },
    },
    { versionKey: false }
);

const ServiceHotel = mongoose.model("service_hotels", ServiceHotelSchema);

module.exports = { ServiceHotel };