const {ServiceHotelRepository} = require('../repositories/index');

async function getServiceHotelById(id) {
    const serviceHotelRepo = new ServiceHotelRepository();
    return await serviceHotelRepo.selectById(id);
}


module.exports =  getServiceHotelById ;