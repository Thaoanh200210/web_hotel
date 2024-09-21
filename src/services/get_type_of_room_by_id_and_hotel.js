const {
    TypeRoomRepository, 
    RoomRepository,
    ServiceRoomRepository,
    SelectionRoomRepository,
    ImageRepository,
    DetailBookingRepository,
    DiscountRepository,
} = require('../repositories/index');

async function getTypeRoomById(hotel, id, startDate, endDate, populate) {
    const typeRoomRepo = new TypeRoomRepository();
    const roomRepo = new RoomRepository();
    const detailBookingRepo = new DetailBookingRepository();
    const serviceRoomRepo = new ServiceRoomRepository();
    const selectionRoomRepo = new SelectionRoomRepository();
    const imageRepo = new ImageRepository();
    const discountRepo = new DiscountRepository();
    let typeOfRoom =  await typeRoomRepo.selectById(id);
    if(populate){
            let rooms = await roomRepo.select({hotel:hotel, type_room:typeOfRoom, status: 'Đang hoạt động'});
            let detailBookings = await detailBookingRepo.select({
                room: {
                    // tìm những thằng nằm trong danh sách room
                    "$in": rooms,
                }
            });
            console.log("Before::", detailBookings.length);
            detailBookings =  detailBookings.filter((detail)=>{
                //tìm ra những phòng có ngày check_in, out >= ngày bắt đầu và <= kết thúc. 
                // if((detail.booking.check_in >= new Date(startDate) && detail.booking.check_in <= new Date(endDate)) || 
                // (detail.booking.check_out >= new Date(startDate) && detail.booking.check_out <= new Date(endDate))){
                //     return true;
                // }else
                if (detail.booking.check_out <= new Date(startDate) && detail.booking.check_out >= new Date(Date.now()) || detail.booking.check_in >= new Date(endDate)) {
                    return false;
                } else
                return true;
             });
            console.log("After::", detailBookings.length);
             //danh sách room đã được đặt.
            let roomBooked = detailBookings.map((detail)=>{
                return detail.room._id.toString();
            });
            console.log(roomBooked);

            //lấy danh sách rooms kh có những phòng đã được đặt.
            rooms = rooms.filter((room)=>{
                console.log(room._id.toString());
                return !roomBooked.includes(room._id.toString());
            })
            console.log(rooms);
            //chứa list room
            let roomResult = [];
            for(let room of rooms ){
                let servicesOfRoom =  await serviceRoomRepo.select({room: room});
                let selectionsOfRoom = await selectionRoomRepo.select({room: room});
                let imagesOfRoom =  await imageRepo.select({room: room});
                roomResult.push({
                    //._doc dùng để lấy data cho đúng.
                    ...room._doc,
                    services: servicesOfRoom.map((serviceOfRoom) => { return serviceOfRoom.service;}),
                    selections: selectionsOfRoom.map((selectionOfRoom) => { return selectionOfRoom.selection;}),
                    images: imagesOfRoom
                })
            }
            roomResult.sort((a, b) => a.original_price - b.original_price);
            let discounts = await discountRepo.select({
                type_room: typeOfRoom,
                hotel:hotel,
            });
            discounts.sort((a, b) => a.discount_percent - b.discount_percent);
            let discount = 0;
            if(discounts.length > 0){
                discount = discounts[0].discount_percent;
            }
            return {
                ...typeOfRoom._doc,
                rooms: roomResult,
                discount: discount,
            };
    }
    else{
        return typeOfRoom;
    }
    
}


module.exports =  getTypeRoomById ;