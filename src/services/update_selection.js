const {SelectionRepository} = require('../repositories/index');

async function updateSelection(data) {
    const selectionRepo = new SelectionRepository();
    return await selectionRepo.updateOne(data._id,data);
}


module.exports =  updateSelection ;