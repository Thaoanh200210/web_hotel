const {RoomRepository} = require('../repositories/index');

async function numberOfRoomByHotel(hotel) {
    const roomRepo = new RoomRepository();
    let rooms =  await roomRepo.select({
        hotel:hotel,
    });
    return rooms.length;
}


module.exports =  numberOfRoomByHotel ;