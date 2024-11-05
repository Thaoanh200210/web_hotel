const {ServiceQuantityRepository} = require('../repositories/index');

async function getAllServicesQuantityOfDetail(bookingDetail) {
    const serviceQuantityRepo = new ServiceQuantityRepository();
    return await serviceQuantityRepo.select( bookingDetail);
}


module.exports =  getAllServicesQuantityOfDetail ;