const { get } = require('config');
const { BookingRepository, DetailBookingRepository} = require('../repositories/index');
const getAllTypeRoomByHotel = require("./get_all_type_of_room_by_hotel");
async function bestTypeRoom(hotel) {
    const bookingRepo = new BookingRepository();
    const detailBookingRepo = new DetailBookingRepository();
    var month = new Date().getMonth();
    var year = new Date().getFullYear();
    var firstDay = new Date(Date.UTC(year, month, 1));
    var lastDay = new Date(Date.UTC(year, month + 1, 0));
    let bookings = await bookingRepo.select({
        $and: [
            {
                check_in : {
                    $gte: firstDay
                }
            },
            {
                check_out:{
                    $lte: lastDay
                }
            }
        ]
    });
    
    let details = await detailBookingRepo.select({
        booking: {$in:bookings},
    })
    details =  details.filter((detail)=>{
        //tìm hotel
        return detail.room.hotel._id.toString() == hotel._id.toString()
    });


    let type_of_rooms = details.map((detail)=>{
        return detail.room.type_room._id.toString() 
    });

    //từng loại phòng được đặt bao nhiêu lần trong tháng
    const groupedByString = {};

    for (const str of type_of_rooms) {
        if (!groupedByString[str]) {
            groupedByString[str] = 0;
        }
        groupedByString[str]++;
    }

    //số lần được đặt nhiều nhất
    const maxCount = Math.max(...Object.values(groupedByString));

    //danh sách những id của loại phòng đc đặt nhiều nhất trong tháng
    const maxCountKeys = Object.keys(groupedByString).filter(
        (key) => groupedByString[key] === maxCount
      );
    
    let typeOfRooms = await getAllTypeRoomByHotel(hotel);
    //Lọc những thằng typeOfRooms có id nằm trong maxcountKeys
    typeOfRooms = typeOfRooms.filter((typeOfRoom)=>{
        return maxCountKeys.includes(typeOfRoom._id.toString())
    })
    
    return {
        typeOfRooms: typeOfRooms,
        maxCount: maxCount,
    };

}


module.exports =  bestTypeRoom ;