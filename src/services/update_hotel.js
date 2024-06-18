const {HotelRepository} = require('../repositories/index');

async function updateHotel(data) {
    const hotelRepo = new HotelRepository();
    return await hotelRepo.updateOne(data._id,data);
}


module.exports =  updateHotel ;