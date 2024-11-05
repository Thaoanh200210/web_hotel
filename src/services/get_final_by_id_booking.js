const {FinalRepository} = require('../repositories/index');

async function getFinalByIdBooking(filter) {
    const finalRepo = new FinalRepository();
    return await finalRepo.selectOne(filter);
}


module.exports =  getFinalByIdBooking ;