const {DetailBookingRepository} = require('../repositories/index');

async function getAllDetailBookingByIdBookings(filter) {
    const detailRepo = new DetailBookingRepository();
    return await detailRepo.select(filter);
}


module.exports =  getAllDetailBookingByIdBookings ;