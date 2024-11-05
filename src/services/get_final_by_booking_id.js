const {FinalRepository } = require('../repositories/index');

async function getFinalByBookingId(id) {
    const finalByBookingRepo = new FinalRepository();
    let finalByBooking = await finalByBookingRepo.select({booking: id});
    return finalByBooking;

}


module.exports =  getFinalByBookingId ;