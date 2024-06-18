const {CityRepository} = require('../repositories/index');

async function getCityById(id) {
    const cityRepo = new CityRepository();
    return await cityRepo.selectById(id);
}


module.exports =  getCityById ;