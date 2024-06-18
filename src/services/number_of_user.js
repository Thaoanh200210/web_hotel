const { RoleEnum } = require('../models/enum/role');
const {UserRepository, RoleRepository} = require('../repositories/index');

async function numberOfUser() {
    const userRepo = new UserRepository();
    const roleRepo = new RoleRepository();
    let roleResult = await roleRepo.selectOne({name: RoleEnum.Customer})
    let users =  await userRepo.select({
        role: roleResult,
    });
    return users.length;
}


module.exports =  numberOfUser ;