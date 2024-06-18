const {TypeRoomRepository} = require('../repositories/index');

async function getAllTypeRooms() {
    const typeRoomRepo = new TypeRoomRepository();
    return await typeRoomRepo.selectAll();
}


module.exports =  getAllTypeRooms ;