const {EventRepository} = require('../repositories/index');

async function getCurrentEvent(hotel) {
    let now = new Date();
    const eventRepo = new EventRepository();
    return await eventRepo.select({
        hotel:hotel,
        date_start:{
            $lte: now,
        },
        date_end:{
            $gte: now,
        }
    });
}


module.exports =  getCurrentEvent ;