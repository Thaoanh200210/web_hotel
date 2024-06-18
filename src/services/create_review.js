const {ReviewRepository} = require('../repositories/index');

async function createReview(data) {
    const reviewRepo = new ReviewRepository();
    return await reviewRepo.create(data);
}


module.exports =  createReview ;