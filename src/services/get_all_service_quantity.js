const {ServiceQuantityRepository} = require('../repositories/index');

async function getAllServicesQuantity(hotel) {
    const serviceQuantityRepo = new ServiceQuantityRepository();
    return await serviceQuantityRepo.select(hotel);
}


module.exports =  getAllServicesQuantity ;