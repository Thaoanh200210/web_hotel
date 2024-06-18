const {ServiceRepository} = require('../repositories/index');

async function getServiceRoomById(id) {
    const serviceRoomRepo = new ServiceRepository();
    return await serviceRoomRepo.selectById(id);
}


module.exports =  getServiceRoomById ;