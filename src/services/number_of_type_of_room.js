const {TypeRoomRepository} = require('../repositories/index');

async function numberOfTypeOfRooms() {
    const typeRoomRepo = new TypeRoomRepository();
    let typeRooms =  await typeRoomRepo.selectAll();
    return typeRooms.length;
}


module.exports =  numberOfTypeOfRooms ;