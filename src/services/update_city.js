const {CityRepository} = require('../repositories/index');

async function updateCity(data) {
    const cityRepo = new CityRepository();
    return await cityRepo.updateOne(data._id,data);
}


module.exports =  updateCity ;