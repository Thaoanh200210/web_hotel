const {EventRepository} = require('../repositories/index');

async function deleteEvent(id) {
    const eventRepo = new EventRepository();
    return await eventRepo.delete(id);
}


module.exports =  deleteEvent ;