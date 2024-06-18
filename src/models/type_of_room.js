const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TypeRoomSchema = new Schema(
    {
        // trim: chuỗi kh được có khoảng cách ở đầu cuối, required bắt buộc
        name: { type: String, trim: true, required: true },
        number_guest: { type: Number, trim: true, required: true },
        deleteAt: {type:Date},
    },
    { versionKey: false }
);

const TypeRoom = mongoose.model("type_rooms", TypeRoomSchema);

module.exports = { TypeRoom };