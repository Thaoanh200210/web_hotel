const {HotelRepository, RoomRepository, ImageRepository} = require('../repositories/index');

async function getAllHotel(isPopulate = false) {
    const hotelRepo = new HotelRepository();
    const roomRepo = new RoomRepository();
    const imageRepo = new ImageRepository();
    let hotels = await hotelRepo.selectAll();
    if (isPopulate) {
        let hotelsPopulated = [];
        for (let hotel of hotels){
            let rooms = await roomRepo.select({hotel: hotel});
            let images = await imageRepo.select({
                room: {
                    "$in": rooms
                }
            });
            hotelsPopulated.push({
                ...hotel._doc,
                rooms: rooms,
                images: images
            })
        }
        return hotelsPopulated;
    } else {
        return hotels;
    }
}


module.exports =  getAllHotel ;