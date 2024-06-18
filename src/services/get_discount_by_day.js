const {EventRepository} = require('../repositories/index');

async function getDiscountByDay(date) {
    const eventRepo = new EventRepository();
    return await eventRepo.selectOne({
        $and: [
            {
                date_start : {
                    $gte: date
                }
            },
            {
                date_end:{
                    $lte: date
                }
            }
        ]
    });
}


module.exports =  getDiscountByDay ;