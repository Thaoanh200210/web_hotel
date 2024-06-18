const {RoleRepository} = require('../repositories/index');

async function getAllRoles(filter) {
    const roleRepo = new RoleRepository();
    return await roleRepo.select(filter);
}


module.exports =  getAllRoles ;