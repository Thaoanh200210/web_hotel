const {ServiceQuantityRepository} = require('../repositories/index');

async function createServiceQuantity(data) {
    const serviceQuantityRepo = new ServiceQuantityRepository();
    return await serviceQuantityRepo.create(data);
}


module.exports =  createServiceQuantity ;