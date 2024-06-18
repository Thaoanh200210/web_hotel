const {UserRepository} = require('../repositories/index');

async function loginUser(data) {
    const userRepo = new UserRepository();
    return await userRepo.login(data);
}


module.exports =  loginUser ;