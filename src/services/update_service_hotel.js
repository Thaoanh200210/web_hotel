const {ServiceHotelRepository} = require('../repositories/index');

async function updateServiceHotel(data) {
    const serviceHotelRepo = new ServiceHotelRepository();
    return await serviceHotelRepo.updateOne(data._id,data);
}


module.exports =  updateServiceHotel ;