const {ServiceQuantityRepository} = require('../repositories/index');

async function getAllServicesQuantity() {
    const serviceQuantityRepo = new ServiceQuantityRepository();
    return await serviceQuantityRepo.selectAll();
}


module.exports =  getAllServicesQuantity ;