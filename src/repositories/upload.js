const cloudinary = require("../config/cloudinary");

class UploadRepository {
    // Hàm xây dựng khởi tạo
    constructor() {}

    async uploadImageFromLocal ({
        path,
        folderName = "hotel/image",
        name = "image",
      }) {
        try {
          const result = await cloudinary.uploader.upload(path, {
            public_id: name,
            folder: folderName,
          });
          return {
            img_url: result.secure_url,
            thumb_url: cloudinary.url(result.public_id, {
              height: 100,
              width: 100,
              format: "jpg",
            }),
          };
        } catch (error) {
          console.error(error);
        }
      };
}

module.exports = { UploadRepository };

