const {RoleRepository} = require('../repositories/index');

async function getAllRoles() {
    const roleRepo = new RoleRepository();
    return await roleRepo.selectAll();
}


module.exports =  getAllRoles ;