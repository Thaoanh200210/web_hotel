const {HotelRepository} = require('../repositories/index');

async function deleteHotel(id) {
    const hotelRepo = new HotelRepository();
    return await hotelRepo.delete(id);
}


module.exports =  deleteHotel ;