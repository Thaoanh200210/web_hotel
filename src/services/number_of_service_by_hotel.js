const {ServiceRepository} = require('../repositories/index');

async function numberOfServiceByHotel(hotel) {
    const serviceRepo = new ServiceRepository();
    let services =  await serviceRepo.select({
        hotel:hotel,
    });
    return services.length;
}


module.exports =  numberOfServiceByHotel ;