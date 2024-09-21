const {BookingRepository} = require('../repositories/index');
const {DetailBookingRepository} = require('../repositories/index')

async function cancelBooking(id) {
    const bookingRepo = new BookingRepository();
    const detailBookingRepo = new DetailBookingRepository();
    await detailBookingRepo.deleteMany({booking: id})
    return await bookingRepo.delete(id);
}


module.exports =  cancelBooking ;