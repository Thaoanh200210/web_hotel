const {BookingRepository, ReviewRepository,DetailBookingRepository } = require('../repositories/index');

async function getBookingById(id, populate=false) {
    const bookingRepo = new BookingRepository();
    const reviewRepo = new ReviewRepository();
    let booking = await bookingRepo.selectById(id);
    if(populate){
        const detailBookingRepo = new DetailBookingRepository();
        let detailBooking = await detailBookingRepo.select({booking: booking});
        let review = await reviewRepo.select({booking: booking});

        return {
            ...booking._doc,
            detailBookings: detailBooking,
            reviews: review,
        }

    }else {
        return booking;
    }
}


module.exports =  getBookingById ;