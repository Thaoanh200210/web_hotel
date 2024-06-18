const {ServiceRepository} = require('../repositories/index');

async function createService(data) {
    const serviceRepo = new ServiceRepository();
    return await serviceRepo.create(data);
}


module.exports =  createService ;