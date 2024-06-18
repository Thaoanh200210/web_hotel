const { Event } = require("../models/index");

class EventRepository {
    // Hàm xây dựng khởi tạo
    constructor() {}

    // deleteAt không có gì, nếu xóa sẽ thêm dữ liệu vào. Sau đó select chỉ cho show những cái không có gì.
    // Thực chất xóa là ẩn.
    async selectAll() {
        try {
            const query = Event.find({
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
            const query = Event.find(filter);
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
            const query = Event.findOne(filter);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectById(id) {
        try {
            // lọc 1 thằng theo id 
            const query = Event.findById(id);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async create(data) {
        try {
            return await Event.create(data);
        } catch (err) {
            console.log(err);
        }
    }

    async updateOne(id, data) {
        try {
            return await Event.updateOne({ _id: id }, data);
        } catch (err) {
            console.log(err);
        }
    }
    
    async update(filter, data) {
        try {
            return await Event.updateMany(filter, data);
        } catch (err) {
            console.log(err);
        }
    }
    async delete(id) {
        try {
            return await Event.updateOne({ _id: id },{
                deleteAt: new Date()
            });
        } catch (err) {
            console.log(err);
        }
    }
    async deleteMany(filter) {
        try {
            return await Event.updateOne(filter,{
                deleteAt: new Date()
            });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = { EventRepository };