const {EventRepository} = require('../repositories/index');

async function getAllEvents(filter) {
    const eventRepo = new EventRepository();
    return await eventRepo.select(filter);
}


module.exports =  getAllEvents ;