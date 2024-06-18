const {CityRepository} = require('../repositories/index');

async function getAllCitys() {
    const cityRepo = new CityRepository();
    return await cityRepo.selectAll();
}


module.exports =  getAllCitys ;