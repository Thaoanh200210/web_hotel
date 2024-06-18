const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema(
    {
        // trim: chuỗi kh được có khoảng cách ở đầu cuối, required bắt buộc
        hotel: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "hotels",
            required: true 
        },
        employee: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "users",
            required: true 
        },
        deleteAt: {type:Date},
    },
    { versionKey: false }
);


// thư viện tự động lấy dữ liệu liên quan 
EmployeeSchema.plugin(require("mongoose-autopopulate"));
const Employee = mongoose.model("employees", EmployeeSchema);

module.exports = { Employee };