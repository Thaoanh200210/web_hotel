const {ServiceHotelRepository} = require('../repositories/index');

async function getAllServicesHotel(filter) {
    const serviceHotelRepo = new ServiceHotelRepository();
    return await serviceHotelRepo.select(filter);
}


module.exports =  getAllServicesHotel ;