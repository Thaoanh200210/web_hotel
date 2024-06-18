const {DetailBookingRepository,RoomRepository} = require('../repositories/index');

async function getAllDetailBookings(hotel) {
    const detailBookingRepo = new DetailBookingRepository();
    const roomRepo = new RoomRepository();
    let rooms = await roomRepo.select({
        hotel:hotel,
    });
    return await detailBookingRepo.select({
        room:{
            "$in":rooms,
        }
    });

}


module.exports =  getAllDetailBookings ;