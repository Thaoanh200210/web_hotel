const {EventRepository} = require('../repositories/index');

async function updateEvent(data) {
    const eventRepo = new EventRepository();
    return await eventRepo.updateOne(data._id,data);
}


module.exports =  updateEvent ;