const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SelectionSchema = new Schema(
    {
        // trim: chuỗi kh được có khoảng cách ở đầu cuối, required bắt buộc
        name: { type: String, trim: true, required: true },
        icon: { type: String, trim: true, required: true },
        deleteAt: {type:Date},
    },
    { versionKey: false }
);

const Selection = mongoose.model("selections", SelectionSchema);

module.exports = { Selection };