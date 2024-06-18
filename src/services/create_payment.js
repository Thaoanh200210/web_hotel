const {PaymentRepository} = require('../repositories/index');

async function createPayment(data) {
    const paymentRepo = new PaymentRepository();
    return await paymentRepo.create(data);
}


module.exports =  createPayment ;