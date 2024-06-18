const {SelectionRepository} = require('../repositories/index');

async function getSelectionById(id) {
    const selectionRepo = new SelectionRepository();
    return await selectionRepo.selectById(id);
}


module.exports =  getSelectionById ;