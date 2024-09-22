const {DiscountRepository} = require('../repositories/index');

async function getAllDiscounts(hotel) {
    const discountRepo = new DiscountRepository();
    const today = new Date();
    return await discountRepo.select({
        hotel: hotel,
    });
}


module.exports =  getAllDiscounts ;