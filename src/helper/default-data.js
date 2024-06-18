module.exports = (req) =>{
    return  {
        hotel: req.hotel,
        message: req.messageResponse,
        user: req.user,
        hotelDatas: req.hotelDatas,
    }
}