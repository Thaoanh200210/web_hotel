const {UserRepository} = require('../repositories/index');

async function deleteUser(id) {
    const userRepo = new UserRepository();
    return await userRepo.delete(id);
}


module.exports =  deleteUser ;