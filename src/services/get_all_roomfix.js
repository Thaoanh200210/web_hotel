const {RoomFixRepository} = require('../repositories/index');

async function getAllRoomFixs() {
    const roomFixRepo = new RoomFixRepository();
    return await roomFixRepo.selectAll();
}


module.exports =  getAllRoomFixs ;