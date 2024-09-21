const {
    RoomRepository,
    ServiceRoomRepository,
    SelectionRoomRepository,
    ImageRepository
} = require('../repositories/index');

async function getRoomByName(name,populate=false) {
    const roomRepo = new RoomRepository();
    let room = await roomRepo.selectOne({name});
    if(populate){
        const serviceRoomRepo = new ServiceRoomRepository();
        const selectionRoomRepo = new SelectionRoomRepository();
        const imageRepo = new ImageRepository();
        let servicesOfRoom =  await serviceRoomRepo.select({room: room});
        let selectionsOfRoom = await selectionRoomRepo.select({room: room});
        let imagesOfRoom =  await imageRepo.select({room: room});
    
        return {
            ...room._doc,
            services: servicesOfRoom.map((serviceOfRoom) => { return serviceOfRoom.service;}),
            selections: selectionsOfRoom.map((selectionOfRoom) => { return selectionOfRoom.selection;}),
            images: imagesOfRoom
        };
    } else {
        return room;
    }
    
}


module.exports =  getRoomByName ;