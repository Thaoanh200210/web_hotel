const {RoomRepository} = require('../repositories/index');

async function createRooms(data) {
    const roomRepo = new RoomRepository();
    return await roomRepo.create(data);
}


module.exports =  createRooms ;