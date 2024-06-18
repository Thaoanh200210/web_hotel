const {ServiceRoomRepository} = require('../repositories/index');

async function deleteServiceRoomByFilter(filter) {
    const serviceroomRepo = new ServiceRoomRepository();
    return await serviceroomRepo.deleteMany(filter);
}


module.exports =  deleteServiceRoomByFilter ;