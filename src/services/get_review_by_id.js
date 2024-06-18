const {ReviewRepository} = require('../repositories/index');

async function getReviewById(id) {
    const reviewRepo = new ReviewRepository();
    return await reviewRepo.selectById(id);
    
}


module.exports =  getReviewById ;