const {RoomRepository} = require('../repositories/index');

async function updateRoom(data) {
    const roomRepo = new RoomRepository();
    return await roomRepo.updateOne(data._id,data);
}


module.exports =  updateRoom ;