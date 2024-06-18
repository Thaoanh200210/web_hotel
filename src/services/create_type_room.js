const {TypeRoomRepository} = require('../repositories/index');

async function createTypeRoom(data) {
    const typeRoomRepo = new TypeRoomRepository();
    return await typeRoomRepo.create(data);
}


module.exports =  createTypeRoom ;