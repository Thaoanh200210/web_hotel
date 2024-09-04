const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitySchema = new Schema(
    {
        // trim: chuỗi kh được có khoảng cách ở đầu cuối, required bắt buộc
        name: { type: String, trim: true, required: true },
        image: { 
            type: String, 
            trim: true, 
            required: true,
            validate: {
                validator: function(v) {
                    return /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp)$/.test(v);
                },
                message: props => `${props.value} không phải là URL hình ảnh hợp lệ!`
            }
        },
        deleteAt: {type:Date},
    },
    { versionKey: false }
);
CitySchema.plugin(require("mongoose-autopopulate"));
const City = mongoose.model("citys", CitySchema);

module.exports = { City };