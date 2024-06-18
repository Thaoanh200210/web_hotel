const {DiscountRepository} = require('../repositories/index');

async function createDiscount(data) {
    const discountRepo = new DiscountRepository();
    return await discountRepo.create(data);
}


module.exports =  createDiscount ;