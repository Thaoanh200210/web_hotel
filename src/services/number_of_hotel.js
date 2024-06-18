const {HotelRepository} = require('../repositories/index');

async function numberOfHotels() {
    const hotelRepo = new HotelRepository();
    let hotels =  await hotelRepo.selectAll();
    return hotels.length;
}


module.exports =  numberOfHotels ;