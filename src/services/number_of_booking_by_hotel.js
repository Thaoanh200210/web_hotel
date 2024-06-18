const {BookingRepository,DetailBookingRepository,RoomRepository} = require('../repositories/index');

async function numberOfBookingByHotel(hotel) {
    const bookingRepo = new BookingRepository();
    const detailBookingRepo = new DetailBookingRepository();
    const roomRepo = new RoomRepository();
    let rooms =  await roomRepo.select({
        hotel:hotel,
    });
    let bookingDetails = await detailBookingRepo.select({
        room: {$in:rooms},
    });
    let bookings = bookingDetails.map(detail => {return detail.booking});
    //loại bỏ những booking trùng id, map id lại để nó hiểu đó là id
    bookings = bookings.filter((booking, index) => bookings.map(x => x._id.toString()).indexOf(booking._id.toString())===index);

    return bookings.length;
}



module.exports =  numberOfBookingByHotel ;