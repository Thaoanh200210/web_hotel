const {EventRepository} = require('../repositories/index');

async function numberOfEventByHotel(hotel) {
    const eventRepo = new EventRepository();
    let events =  await eventRepo.select({
        hotel:hotel,
    });
    return events.length;
}


module.exports =  numberOfEventByHotel ;