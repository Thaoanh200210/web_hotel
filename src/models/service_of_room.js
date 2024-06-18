const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceRoomSchema = new Schema(
    {
        // trim: chuỗi kh được có khoảng cách ở đầu cuối, required bắt buộc
        room: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "rooms",
            required: true 
        },
        service: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "services",
            required: true 
        },
        deleteAt: {type:Date},
    },
    { versionKey: false }
);


// thư viện tự động lấy dữ liệu liên quan 
ServiceRoomSchema.plugin(require("mongoose-autopopulate"));
const ServiceRoom = mongoose.model("service_rooms", ServiceRoomSchema);

module.exports = { ServiceRoom };