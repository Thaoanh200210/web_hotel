const {ImageRepository} = require('../repositories/index');

async function getImageByFilter(filter) {
    const imageRepo = new ImageRepository();
    return await imageRepo.select(filter);
}


module.exports =  getImageByFilter ;