const {CityRepository} = require('../repositories/index');

async function createCity(data) {
    const cityRepo = new CityRepository();
    return await cityRepo.create(data);
}


module.exports =  createCity ;