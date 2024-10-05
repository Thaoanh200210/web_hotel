const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SelectionSchema = new Schema(
    {
        // trim: chuỗi kh được có khoảng cách ở đầu cuối, required bắt buộc
        name: { type: String, trim: true, required: true },
        icon: { type: String, trim: true, required: true },
        hotel: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "hotels",
            required: true 
        },
        deleteAt: {type:Date},
    },
    { versionKey: false }
);

const Selection = mongoose.model("selections", SelectionSchema);

module.exports = { Selection };