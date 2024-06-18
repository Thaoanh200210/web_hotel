const {DiscountRepository} = require('../repositories/index');

async function updateDiscount(data) {
    const discountRepo = new DiscountRepository();
    return await discountRepo.updateOne(data._id,data);
}


module.exports =  updateDiscount ;