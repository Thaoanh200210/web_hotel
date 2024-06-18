const {BookingRepository, PaymentRepository,DetailBookingRepository, ReviewRepository } = require('../repositories/index');

async function getBookingByUser(user, populate = false) {
    const bookingRepo = new BookingRepository();
    const detailBookingRepo = new DetailBookingRepository();
    const paymentRepo = new PaymentRepository();
    const reviewRepo = new ReviewRepository();
    let bookings = await bookingRepo.select({
        customer: user,
    });
    if(populate) {
        let bookingResult = [];
        for( let booking of bookings){
            //tim nhung payment co booking = booking;
            let payments = await paymentRepo.select({
                booking: booking,
            });
            let details = await detailBookingRepo.select({
                booking: booking,
            });
            let reviews = await reviewRepo.select({
                booking: booking,
            });
            bookingResult.push({
                ...booking._doc,
                details: details,
                reviews:reviews,
                payments: payments, 
            });
        }
        return bookingResult;
    }else{
        return bookings;
    }
}


module.exports =  getBookingByUser ;