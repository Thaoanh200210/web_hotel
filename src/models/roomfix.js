const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomFixSchema = new Schema(
    {
        // trim: chuỗi kh được có khoảng cách ở đầu cuối, required bắt buộc
        lydo: { type: String, trim: true, required: true },
        description: { type: String, trim: true, required: true },
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


// thư viện tự động lấy dữ liệu liên quan 
RoomFixSchema.plugin(require("mongoose-autopopulate"));
const RoomFix = mongoose.model("roomfixs", RoomFixSchema);

module.exports = { RoomFix };