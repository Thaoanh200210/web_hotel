const {SelectionRepository} = require('../repositories/index');

async function getSelectionRoomById(id) {
    const selectionRoomRepo = new SelectionRepository();
    return await selectionRoomRepo.selectById(id);
}


module.exports =  getSelectionRoomById ;