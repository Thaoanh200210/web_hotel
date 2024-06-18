const {BookingRepository} = require('../repositories/index');

async function updateBooking(data) {
    const bookingRepo = new BookingRepository();
    return await bookingRepo.updateOne(data._id,data);
}


module.exports =  updateBooking ;