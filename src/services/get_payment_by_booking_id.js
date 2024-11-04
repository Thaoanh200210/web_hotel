const {PaymentRepository} = require('../repositories/index');

async function getPaymentByIdBooking(filter) {
    const paymentRepo = new PaymentRepository();
    return await paymentRepo.selectOne(filter);
}


module.exports =  getPaymentByIdBooking ;