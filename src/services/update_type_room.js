const {TypeRoomRepository} = require('../repositories/index');

async function updateTypeRoom(data) {
    const typeRoomRepo = new TypeRoomRepository();
    return await typeRoomRepo.updateOne(data._id,data);
}


module.exports =  updateTypeRoom ;