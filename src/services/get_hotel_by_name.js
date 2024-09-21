const {HotelRepository} = require('../repositories/index');

async function getHotelByName(name) {
    const hotelRepo = new HotelRepository();
    return await hotelRepo.select({name: name});
}


module.exports =  getHotelByName;