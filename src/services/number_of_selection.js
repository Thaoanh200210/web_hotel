const {SelectionRepository} = require('../repositories/index');

async function numberOfSelections() {
    const selectionRepo = new SelectionRepository();
    let selections =  await selectionRepo.selectAll();
    return selections.length;
}


module.exports =  numberOfSelections ;