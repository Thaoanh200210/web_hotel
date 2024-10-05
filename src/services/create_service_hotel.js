const {ServiceHotelRepository} = require('../repositories/index');

async function createServiceHotel(data) {
    const serviceHotelRepo = new ServiceHotelRepository();
    return await serviceHotelRepo.create(data);
}


module.exports =  createServiceHotel ;