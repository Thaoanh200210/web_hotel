const {DetailBookingRepository,RoomRepository} = require('../repositories/index');

async function getAllBookings(hotel) {
    const detailBookingRepo = new DetailBookingRepository();
    const roomRepo = new RoomRepository();
    let rooms = await roomRepo.select({
        hotel:hotel,
    });
    let detailBookings = await detailBookingRepo.select({
        room:{
            "$in":rooms,
        }
    });
    //lấy từng chi tiết của booking
    let bookings = detailBookings.map(detail => {return detail.booking});
    //loại bỏ những booking trùng id, map id lại để nó hiểu đó là id
    bookings = bookings.filter((booking, index) => bookings.map(x => x._id.toString()).indexOf(booking._id.toString())===index);
    return bookings;
}


module.exports =  getAllBookings ;