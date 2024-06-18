/**
 * Created by CTT VNPAY
 */

//Đường link set up VNpay: https://sandbox.vnpayment.vn/apis/downloads/

let express = require('express');
let router = express.Router();
const { VNPayController } = require('../controllers/vnpay');

const vnPay = new VNPayController()

router.get('/', function(req, res, next){
    res.render('vn_pay/orderlist.jade', { title: 'Danh sách đơn hàng' })
});

router.get('/create_payment_url/:id', function (req, res, next) {
    res.render('vn_pay/order.jade', {title: 'Tạo mới đơn hàng', amount: req.query.amount})
});

router.get('/querydr', function (req, res, next) {
    
    let desc = 'truy van ket qua thanh toan';
    res.render('vn_pay/querydr.jade', {title: 'Truy vấn kết quả thanh toán'})
});

router.get('/refund', function (req, res, next) {
    
    let desc = 'Hoan tien GD thanh toan';
    res.render('vn_pay/refund.jade', {title: 'Hoàn tiền giao dịch thanh toán'})
});


router.post('/create_payment_url/:id', vnPay.createPaymentUrl);

router.get('/vnpay_return', vnPay.vnpayReturn);

router.get('/vnpay_ipn', vnPay.vnpayIpn);

router.post('/querydr', vnPay.querydr);

router.post('/refund', vnPay.refund);



module.exports = router;