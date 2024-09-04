const {CityRepository} = require('../repositories/index');

async function deleteCity(id) {
    const cityRepo = new CityRepository();
    return await cityRepo.delete(id);
}


module.exports =  deleteCity ;