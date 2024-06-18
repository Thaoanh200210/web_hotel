const {ServiceRepository} = require('../repositories/index');

async function deleteService(id) {
    const serviceRepo = new ServiceRepository();
    return await serviceRepo.delete(id);
}


module.exports =  deleteService ;