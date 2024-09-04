const {HotelRepository} = require('../repositories/index');

async function getHotelById(cityID) {
    const hotelRepo = new HotelRepository();
    return await hotelRepo.select({city: cityID});
}


module.exports =  getHotelById ;