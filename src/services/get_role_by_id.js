const {RoleRepository} = require('../repositories/index');

async function getRoleById(id) {
    const roleRepo = new RoleRepository();
    return await roleRepo.selectById(id);
}


module.exports =  getRoleById ;