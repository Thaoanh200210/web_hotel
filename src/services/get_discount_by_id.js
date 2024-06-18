const {DiscountRepository} = require('../repositories/index');

async function getDiscountById(id) {
    const discountRepo = new DiscountRepository();
    return await discountRepo.selectById(id);
}


module.exports =  getDiscountById ;