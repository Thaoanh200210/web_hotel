const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceSchema = new Schema(
    {
        // trim: chuỗi kh được có khoảng cách ở đầu cuối, required bắt buộc
        name: { type: String, trim: true, required: true },
        icon: { type: String, trim: true, required: true },
    },
    { versionKey: false }
);

const Service = mongoose.model("services", ServiceSchema);

module.exports = { Service };