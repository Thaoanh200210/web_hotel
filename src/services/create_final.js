const {FinalRepository} = require('../repositories/index');

async function createFinals(data) {
    const finalRepo = new FinalRepository();
    return await finalRepo.create(data);
}


module.exports =  createFinals ;