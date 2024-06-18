const {ImageRepository} = require('../repositories/index');

async function deleteImageByFilter(filter) {
    const imageRepo = new ImageRepository();
    return await imageRepo.deleteMany(filter);
}


module.exports =  deleteImageByFilter ;