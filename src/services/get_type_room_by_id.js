const {TypeRoomRepository} = require('../repositories/index');

async function getTypeRoomById(id) {
    const typeRoomRepo = new TypeRoomRepository();
    return await typeRoomRepo.selectById(id);
}


module.exports =  getTypeRoomById ;