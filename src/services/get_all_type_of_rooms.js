const {TypeRoomRepository} = require('../repositories/index');

async function getAllTypeRooms(hotel) {
    const typeRoomRepo = new TypeRoomRepository();
    return await typeRoomRepo.selectAll({
        hotel: hotel,
    });
}


module.exports =  getAllTypeRooms ;