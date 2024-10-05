const {DetailBookingRepository} = require('../repositories/index');

async function updateBookingDetail(data) {
    const bookingRepo = new DetailBookingRepository();
    return await bookingRepo.updateOne(data._id, data);
}


module.exports =  updateBookingDetail;