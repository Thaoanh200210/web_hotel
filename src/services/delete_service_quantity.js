const {ServiceQuantityRepository} = require('../repositories/index');

async function deleteServiceQuantity(id) {
    const serviceQuantityRepo = new ServiceQuantityRepository();
    return await serviceQuantityRepo.delete(id);
}


module.exports =  deleteServiceQuantity ;