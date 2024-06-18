const { RoleEnum } = require('../models/enum/role');
const {UserRepository, RoleRepository} = require('../repositories/index');

async function createUser(data,roleName = RoleEnum.Customer) {
    const userRepo = new UserRepository();
    const roleRepo = new RoleRepository();
    let roleResult = await roleRepo.selectOne({name: roleName})
    data.role = roleResult;
    return await userRepo.create(data);
}


module.exports =  createUser ;