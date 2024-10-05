const {ServiceHotelRepository} = require('../repositories/index');

async function deleteServiceHotel(id) {
    const serviceHotelRepo = new ServiceHotelRepository();
    return await serviceHotelRepo.delete(id);
}


module.exports =  deleteServiceHotel ;