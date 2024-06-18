const {BookingRepository} = require('../repositories/index');

async function createBookings(data) {
    const bookingRepo = new BookingRepository();
    return await bookingRepo.create(data);
}


module.exports =  createBookings ;