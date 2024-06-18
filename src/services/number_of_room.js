const {RoomRepository} = require('../repositories/index');

async function numberOfRooms() {
    const roomRepo = new RoomRepository();
    let rooms =  await roomRepo.selectAll();
    return rooms.length;
}


module.exports =  numberOfRooms ;