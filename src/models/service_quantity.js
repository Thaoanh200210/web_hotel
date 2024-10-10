const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServicequantitySchema = new Schema(
    {
        quatity: { type: Number, trim: true, required: true },
        service_hotel: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "service_hotels",
            required: true 
        },
        detail_booking: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "detail_bookings",
            required: true 
        },
        deleteAt: {type:Date},
    },
    { versionKey: false }
);


ServicequantitySchema.plugin(require("mongoose-autopopulate"));
const ServiceQuantity = mongoose.model("service_quantitys", ServicequantitySchema);

module.exports = { ServiceQuantity };