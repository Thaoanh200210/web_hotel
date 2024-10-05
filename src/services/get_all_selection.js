const {SelectionRepository} = require('../repositories/index');

async function getAllSelections(filter) {
    const selectionRepo = new SelectionRepository();
    return await selectionRepo.select(filter);
}


module.exports =  getAllSelections ;