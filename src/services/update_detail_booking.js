const {DetailBookingRepository} = require('../repositories/index');

async function updateBookingDetail(id,data) {
    const bookingRepo = new DetailBookingRepository();
    return await bookingRepo.updateOne(id, data);
}


module.exports =  updateBookingDetail;