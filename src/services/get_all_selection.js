const {SelectionRepository} = require('../repositories/index');

async function getAllSelections() {
    const selectionRepo = new SelectionRepository();
    return await selectionRepo.selectAll();
}


module.exports =  getAllSelections ;