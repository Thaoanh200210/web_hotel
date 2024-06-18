const {RoomRepository} = require('../repositories/index');

async function getAllRooms(filter) {
    const roomRepo = new RoomRepository();
    return await roomRepo.select(filter);
}


module.exports =  getAllRooms ;