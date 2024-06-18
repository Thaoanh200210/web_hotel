const {ServiceRepository} = require('../repositories/index');

async function getAllServices() {
    const serviceRepo = new ServiceRepository();
    return await serviceRepo.selectAll();
}


module.exports =  getAllServices ;