const {ImageRepository,RoomRepository} = require('../repositories/index');

async function getImageOfHotel(hotel) {
    const imageRepo = new ImageRepository();
    const roomRepo = new RoomRepository();
    let rooms = await roomRepo.select({hotel: hotel});
    return await imageRepo.select({
        room: { 
            $in: rooms
        }
    });
}


module.exports =  getImageOfHotel ;