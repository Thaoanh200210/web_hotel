const {UserRepository} = require('../repositories/index');

async function getUserById(id) {
    const userRepo = new UserRepository();
    let user =  await userRepo.selectById(id);
    return user;
}


module.exports =  getUserById ;