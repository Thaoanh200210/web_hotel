const {ServiceHotelRepository} = require('../repositories/index');

async function getAllServicesHotel(hotel) {
    const serviceHotelRepo = new ServiceHotelRepository();
    return await serviceHotelRepo.select(hotel);
}


module.exports =  getAllServicesHotel ;