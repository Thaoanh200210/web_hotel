const { User } = require("../models/index");

class UserRepository {
    // Hàm xây dựng khởi tạo
    constructor() {}

    // deleteAt không có gì, nếu xóa sẽ thêm dữ liệu vào. Sau đó select chỉ cho show những cái không có gì.
    // Thực chất xóa là ẩn.
    async selectAll() {
        try {
            const query = User.find({
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
            const query = User.find(filter);
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
            const query = User.findOne(filter);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectById(id) {
        try {
            // lọc 1 thằng theo id 
            const query = User.findById(id);
            return await query.exec();

        } catch (err) {
            console.log(err);
        }
    }
    async create(data) {
        try {
            return await User.create(data);
        } catch (err) {
            console.log(err);
        }
    }

    async updateOne(id, data) {
        try {
            return await User.updateOne({ _id: id }, data);
        } catch (err) {
            console.log(err);
        }
    }
    
    async update(filter, data) {
        try {
            return await User.updateMany(filter, data);
        } catch (err) {
            console.log(err);
        }
    }
    async delete(id) {
        try {
            return await User.updateOne({ _id: id },{
                deleteAt: new Date()
            });
        } catch (err) {
            console.log(err);
        }
    }
    async deleteMany(filter) {
        try {
            return await User.updateOne(filter,{
                deleteAt: new Date()
            });
        } catch (err) {
            console.log(err);
        }
    }
    async login(user) {
        try {
            // lọc 1 thằng theo yêu cầu
            
            let filter = {
                deleteAt : {
                    $exists: false,
                    $in: [null, undefined] 
                },
                email: user.email,
            }
            const query = User.findOne(filter);
            let currentUser = await query.exec();
            if(currentUser){
                let isMatch = await currentUser.comparePassword(user.password);
                return isMatch ? currentUser : null;
            }
            return null;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = { UserRepository };