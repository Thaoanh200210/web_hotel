const {RoomRepository} = require('../repositories/index');

async function deleteRoom(id) {
    const roomRepo = new RoomRepository();
    return await roomRepo.delete(id);
}


module.exports =  deleteRoom ;