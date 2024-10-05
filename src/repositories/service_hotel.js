const { ServiceHotel } = require("../models/index");

class ServiceHotelRepository {
    // Hàm xây dựng khởi tạo
    constructor() {}

    // deleteAt không có gì, nếu xóa sẽ thêm dữ liệu vào. Sau đó select chỉ cho show những cái không có gì.
    // Thực chất xóa là ẩn.
    async selectAll() {
        try {
            const query = ServiceHotel.find({
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
            const query = ServiceHotel.find(filter);
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
            const query = ServiceHotel.findOne(filter);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectById(id) {
        try {
            // lọc 1 thằng theo id 
            const query = ServiceHotel.findById(id);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async create(data) {
        try {
            return await ServiceHotel.create(data);
        } catch (err) {
            console.log(err);
        }
    }

    async updateOne(id, data) {
        try {
            return await ServiceHotel.updateOne({ _id: id }, data);
        } catch (err) {
            console.log(err);
        }
    }
    
    async update(filter, data) {
        try {
            return await ServiceHotel.updateMany(filter, data);
        } catch (err) {
            console.log(err);
        }
    }
    async delete(id) {
        try {
            return await ServiceHotel.updateOne({ _id: id },{
                deleteAt: new Date()
            });
        } catch (err) {
            console.log(err);
        }
    }
    async deleteMany(filter) {
        try {
            return await ServiceHotel.updateOne(filter,{
                deleteAt: new Date()
            });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = { ServiceHotelRepository };