var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HotelSchema = new Schema(
    {
        // trim: chuỗi kh được có khoảng cách ở đầu cuối, required bắt buộc
        owner: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "users",
            required: true 
        },
        name: { type: String, trim: true, required: true },
        address: { type: String, trim: true, required: true },
        description: { type: String, trim: true, required: true },
        star: { type: Number, trim: true, required: true },
        city_id:{type: String, trim: true, required: true},
        deleteAt: {type:Date},
    },
    { versionKey: false }
);


// thư viện tự động lấy dữ liệu liên quan 
HotelSchema.plugin(require("mongoose-autopopulate"));
const Hotel = mongoose.model("hotels", HotelSchema);

module.exports = { Hotel };