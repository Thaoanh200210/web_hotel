const {ServiceRepository} = require('../repositories/index');

async function numberOfServices() {
    const serviceRepo = new ServiceRepository();
    let services =  await serviceRepo.selectAll();
    return services.length;
}


module.exports =  numberOfServices ;