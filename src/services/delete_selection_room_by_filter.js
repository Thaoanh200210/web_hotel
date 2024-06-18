const {SelectionRoomRepository} = require('../repositories/index');

async function deleteSelectionRoomByFilter(filter) {
    const selectionRoomRepo = new SelectionRoomRepository();
    return await selectionRoomRepo.deleteMany(filter);
}


module.exports =  deleteSelectionRoomByFilter ;