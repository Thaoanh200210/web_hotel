const { RoleEnum } = require('../models/enum/role');
const {UserRepository,RoleRepository} = require('../repositories/index');

async function getAllUsers(role = RoleEnum.Customer) {
    const roomRepo = new UserRepository();
    const roleRepo = new RoleRepository();
    let roleResult = await roleRepo.selectOne({name: role})
    return await roomRepo.select({role: roleResult});
}


module.exports =  getAllUsers ;