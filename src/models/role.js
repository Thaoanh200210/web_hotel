const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema(
    {
        // trim: chuỗi kh được có khoảng cách ở đầu cuối, required bắt buộc
        name: { type: String, trim: true, required: true },
        deleteAt: {type:Date},
    },
    { versionKey: false }
);

const Role = mongoose.model("roles", RoleSchema);

module.exports = { Role };