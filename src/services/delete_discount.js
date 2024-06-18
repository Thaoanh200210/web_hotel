const {DiscountRepository} = require('../repositories/index');

async function deleteDiscount(id) {
    const discountRepo = new DiscountRepository();
    return await discountRepo.delete(id);
}


module.exports =  deleteDiscount ;