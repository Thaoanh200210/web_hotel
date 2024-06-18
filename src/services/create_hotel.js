const {HotelRepository} = require('../repositories/index');

async function createHotels(data) {
    const hotelRepo = new HotelRepository();
    return await hotelRepo.create(data);
}


module.exports =  createHotels ;