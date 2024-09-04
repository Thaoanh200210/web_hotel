var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HotelSchema = new Schema(
    {
        // trim: chuỗi không được có khoảng cách ở đầu cuối, required: bắt buộc
        owner: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, // giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "users",
            required: true 
        },
        name: { type: String, trim: true, required: true },
        address: { type: String, trim: true, required: true },
        description: { type: String, trim: true, required: true },
        star: { type: Number, required: true, min: 1, max: 5 },
        slogan: { type: String, trim: true, required: true },
        city: {
            type: String
        },
        image: { 
            type: String, 
            trim: true, 
            required: true,
            validate: {
                validator: function(v) {
                    return /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp)$/.test(v);
                },
                message: props => `${props.value} không phải là URL hình ảnh hợp lệ!`
            }
        },
        isActive: {
            type: Boolean,
            default: false
        },
        deleteAt: { type: Date },
    },
    { versionKey: false }
);

// Thư viện tự động lấy dữ liệu liên quan 
HotelSchema.plugin(require("mongoose-autopopulate"));

const Hotel = mongoose.model("hotels", HotelSchema);

module.exports = { Hotel };
