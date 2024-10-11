const {ServiceQuantityRepository} = require('../repositories/index');

async function getServiceQuantityById(id) {
    const serviceQuantityRepo = new ServiceQuantityRepository();
    return await serviceQuantityRepo.selectById(id);
}


module.exports =  getServiceQuantityById ;