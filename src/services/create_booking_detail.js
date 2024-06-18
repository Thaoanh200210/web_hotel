const {DetailBookingRepository} = require('../repositories/index');

async function createBookingDetails(data) {
    const detailBookingRepo = new DetailBookingRepository();
    return await detailBookingRepo.create(data);
}


module.exports =  createBookingDetails ;