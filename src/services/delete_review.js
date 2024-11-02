const {ReviewRepository} = require('../repositories/index');

async function deleteReview(id) {
    const reviewRepo = new ReviewRepository();
    return await reviewRepo.delete(id);
}


module.exports =  deleteReview ;