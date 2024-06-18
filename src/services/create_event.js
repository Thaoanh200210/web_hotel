const {EventRepository} = require('../repositories/index');

async function createEvent(data) {
    const eventRepo = new EventRepository();
    return await eventRepo.create(data);
}


module.exports =  createEvent ;