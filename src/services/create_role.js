const {RoleRepository} = require('../repositories/index');

async function createRole(data) {
    const roleRepo = new RoleRepository();
    return await roleRepo.create(data);
}


module.exports =  createRole ;