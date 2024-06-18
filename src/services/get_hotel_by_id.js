const {HotelRepository} = require('../repositories/index');

async function getHotelById(id) {
    const hotelRepo = new HotelRepository();
    return await hotelRepo.selectById(id);
}


module.exports =  getHotelById ;