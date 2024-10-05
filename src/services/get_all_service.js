const {ServiceRepository} = require('../repositories/index');

async function getAllServices(filter) {
    const serviceRepo = new ServiceRepository();
    return await serviceRepo.select(filter);
}


module.exports =  getAllServices ;