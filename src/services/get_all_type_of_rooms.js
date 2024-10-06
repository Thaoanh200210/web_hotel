const {TypeRoomRepository} = require('../repositories/index');

async function getAllTypeRooms(hotel) {
    const typeRoomRepo = new TypeRoomRepository();
    return await typeRoomRepo.select({
        hotel: hotel,
    });
}


module.exports =  getAllTypeRooms ;