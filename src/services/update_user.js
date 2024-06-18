const {UserRepository} = require('../repositories/index');

async function updateUser(data) {
    const userRepo = new UserRepository();
    return await userRepo.updateOne(data._id,data);
}


module.exports =  updateUser ;