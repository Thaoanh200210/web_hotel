const {EventRepository} = require('../repositories/index');

async function getEventById(id) {
    const eventRepo = new EventRepository();
    return await eventRepo.selectById(id);
}


module.exports =  getEventById ;