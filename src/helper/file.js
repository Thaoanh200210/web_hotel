const fs = require("fs");
const path = require("path");
module.exports = (data, mimetype) => {
    //dùng để lưu file như hình ảnh phòng vào image/upload
    let dir = path.join(__dirname, "..", "public", "uploads");
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    let extendFile = mimetype.split("/")[1];
    //đặt theo ngày h upload.
    let fileName = new Date().getTime().toString() + "." + extendFile;
    fs.writeFileSync(path.join(dir, fileName), data);
    return fileName;
};
