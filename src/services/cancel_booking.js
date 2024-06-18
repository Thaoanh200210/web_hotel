const {BookingRepository} = require('../repositories/index');

async function cancelBooking(id) {
    const bookingRepo = new BookingRepository();
    return await bookingRepo.delete(id);
}


module.exports =  cancelBooking ;