const {ServiceRepository} = require('../repositories/index');

async function updateService(data) {
    const serviceRepo = new ServiceRepository();
    return await serviceRepo.updateOne(data._id,data);
}


module.exports =  updateService ;