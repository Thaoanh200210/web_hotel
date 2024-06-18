const {SelectionRepository} = require('../repositories/index');

async function createSelection(data) {
    const selectionRepo = new SelectionRepository();
    return await selectionRepo.create(data);
}


module.exports =  createSelection ;