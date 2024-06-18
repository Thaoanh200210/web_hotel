const {TypeRoomRepository} = require('../repositories/index');

async function deleteTypeRoom(id) {
    const typeRoomRepo = new TypeRoomRepository();
    return await typeRoomRepo.delete(id);
}


module.exports =  deleteTypeRoom ;