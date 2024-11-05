const {RoomRepository} = require('../repositories/index');

async function getRoomByHotel(hotel) {
    const roomRepo = new RoomRepository();
    let rooms =  await roomRepo.select({
        hotel:hotel,
    });
    return rooms;
}


module.exports =  getRoomByHotel ;