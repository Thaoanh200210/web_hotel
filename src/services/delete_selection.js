const {SelectionRepository} = require('../repositories/index');

async function deleteSelection(id) {
    const selectionRepo = new SelectionRepository();
    return await selectionRepo.delete(id);
}


module.exports =  deleteSelection ;