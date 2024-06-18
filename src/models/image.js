const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema(
    {
        // trim: chuỗi kh được có khoảng cách ở đầu cuối, required bắt buộc
        url: { type: String, trim: true, required: true },
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


ImageSchema.plugin(require("mongoose-autopopulate"));
const Image = mongoose.model("images", ImageSchema);

module.exports = { Image };