const {ServiceRepository} = require('../repositories/index');

async function getServiceById(id) {
    const serviceRepo = new ServiceRepository();
    return await serviceRepo.selectById(id);
}


module.exports =  getServiceById ;