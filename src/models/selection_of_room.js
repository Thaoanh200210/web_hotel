const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SelectionRoomSchema = new Schema(
    {
        // trim: chuỗi kh được có khoảng cách ở đầu cuối, required bắt buộc
        room: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "rooms",
            required: true 
        },
        selection: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "selections",
            required: true 
        },
        deleteAt: {type:Date},
    },
    { versionKey: false }
);


// thư viện tự động lấy dữ liệu liên quan 
SelectionRoomSchema.plugin(require("mongoose-autopopulate"));
const SelectionRoom = mongoose.model("selection_rooms", SelectionRoomSchema);

module.exports = { SelectionRoom };