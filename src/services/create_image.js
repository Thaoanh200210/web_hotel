const {ImageRepository} = require('../repositories/index');

async function createImages(data) {
    const imageRepo = new ImageRepository();
    return await imageRepo.create(data);
}


module.exports =  createImages ;