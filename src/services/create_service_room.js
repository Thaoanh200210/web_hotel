const {ServiceRoomRepository} = require('../repositories/index');

async function createServiceRooms(data) {
    const serviceroomRepo = new ServiceRoomRepository();
    return await serviceroomRepo.create(data);
}


module.exports =  createServiceRooms ;