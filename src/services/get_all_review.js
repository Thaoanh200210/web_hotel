const {ReviewRepository, RoomRepository} = require('../repositories/index');

async function getAllReviews(hotel) {
    const reviewRepo = new ReviewRepository();
    const roomRepo = new RoomRepository();
    let rooms = await roomRepo.select({
        hotel:hotel,
    });
    // lấy cái room nằm trong danh sách rooms 
    return await reviewRepo.select({
        room : {
            "$in": rooms,
        }
    });
}


module.exports =  getAllReviews ;