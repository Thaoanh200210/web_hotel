const {BookingRepository} = require('../repositories/index');

async function deleteBooking(id) {
    const bookingRepo = new BookingRepository();
    return await bookingRepo.delete(id);
}


module.exports =  deleteBooking ;