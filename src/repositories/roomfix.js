const { RoomFix } = require("../models/index");

class RoomFixRepository {
    // Hàm xây dựng khởi tạo
    constructor() {}

    // deleteAt không có gì, nếu xóa sẽ thêm dữ liệu vào. Sau đó select chỉ cho show những cái không có gì.
    // Thực chất xóa là ẩn.
    async selectAll() {
        try {
            const query = RoomFix.find({
                deleteAt: {
                  $exists: false,
                  $in: [null, undefined] 
                }
              });
                // execute: thực thi
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }

    async select(filter) {
        try {
            // lọc ra 1 list theo yêu cầu
            filter.deleteAt = {
                $exists: false,
                $in: [null, undefined] 
              }
            const query = RoomFix.find(filter);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectOne(filter) {
        try {
            // lọc 1 thằng theo yêu cầu
            filter.deleteAt = {
                $exists: false,
                $in: [null, undefined] 
              }
            const query = RoomFix.findOne(filter);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectById(id) {
        try {
            // lọc 1 thằng theo id 
            const query = RoomFix.findById(id);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async create(data) {
        try {
            return await RoomFix.create(data);
        } catch (err) {
            console.log(err);
        }
    }

    async updateOne(id, data) {
        try {
            return await RoomFix.updateOne({ _id: id }, data);
        } catch (err) {
            console.log(err);
        }
    }
    
    async update(filter, data) {
        try {
            return await RoomFix.updateMany(filter, data);
        } catch (err) {
            console.log(err);
        }
    }
    async delete(id) {
        try {
            return await RoomFix.deleteOne({ _id: id });
        } catch (err) {
            console.log(err);
            throw err;  // Nếu muốn bắt lỗi ở nơi gọi hàm, bạn nên ném lỗi ra ngoài.
        }
    }
    async deleteMany(filter) {
        try {
            return await RoomFix.updateOne(filter,{
                deleteAt: new Date()
            });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = { RoomFixRepository };