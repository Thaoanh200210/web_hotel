const {CityRepository} = require('../repositories/index');

async function numberOfCitys() {
    const CityRepo = new CityRepository();
    let Citys =  await CityRepo.selectAll();
    return Citys.length;
}


module.exports =  numberOfCitys ;