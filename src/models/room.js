const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema(
    {
        // trim: chuỗi kh được có khoảng cách ở đầu cuối, required bắt buộc
        hotel: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "hotels",
            required: true 
        },
        name: { type: String, trim: true, required: true },
        original_price: { type: String, trim: true, required: true },
        number_room: { type: String, trim: true, required: true },
        description: { type: String, trim: true, required: true },
        type_room: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "type_rooms",
            required: true 
        },
        deleteAt: {type:Date},
    },
    { versionKey: false }
);


// thư viện tự động lấy dữ liệu liên quan 
RoomSchema.plugin(require("mongoose-autopopulate"));
const Room = mongoose.model("rooms", RoomSchema);

module.exports = { Room };