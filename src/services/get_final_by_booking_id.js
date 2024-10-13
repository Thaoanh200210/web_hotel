const {FinalRepository} = require('../repositories/index');

async function getFinalByIdBooking(filter) {
    const finalRepo = new FinalRepository();
    return await finalRepo.select(filter);
}


module.exports =  getFinalByIdBooking ;