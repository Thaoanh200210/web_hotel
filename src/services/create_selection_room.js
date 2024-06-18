const {SelectionRoomRepository} = require('../repositories/index');

async function createSelectionRooms(data) {
    const selectionroomRepo = new SelectionRoomRepository();
    return await selectionroomRepo.create(data);
}


module.exports =  createSelectionRooms ;