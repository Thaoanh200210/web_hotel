const {DetailBookingRepository } = require('../repositories/index');

async function getBookingById(id) {
    const detailBookingRepo = new DetailBookingRepository();
    let detailBooking = await detailBookingRepo.selectOne({booking: id});
    return detailBooking
}


module.exports =  getBookingById ;