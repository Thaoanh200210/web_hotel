const {
    TypeRoomRepository, 
    RoomRepository,
    ServiceRoomRepository,
    SelectionRoomRepository,
    ImageRepository,
    DiscountRepository,
    DetailBookingRepository
} = require('../repositories/index');

async function getAllTypeRoomByHotel(hotel, startDate= "", endDate= "") {
    const typeRoomRepo = new TypeRoomRepository();
    const roomRepo = new RoomRepository();
    const serviceRoomRepo = new ServiceRoomRepository();
    const detailBookingRepo = new DetailBookingRepository();
    const selectionRoomRepo = new SelectionRoomRepository();
    const imageRepo = new ImageRepository();
    const discountRepo = new DiscountRepository();
    let typesOfRoom =  await typeRoomRepo.select({
        hotel: hotel,
    });
    //list typeofroom
    let result = [];
    for(let typeOfRoom of typesOfRoom){
        let rooms = await roomRepo.select({hotel:hotel, type_room:typeOfRoom, status: 'Đang hoạt động'});
        // console.log("All rooms of hotel", rooms.length);
        if (startDate != "" || endDate != "") {
            let detailBookings = await detailBookingRepo.select({
                room: {
                    "$in": rooms,
                },
                status: {
                    "$eq": "Đang đặt" // Tìm status "Đang đặt"
                }
            });
            // detailBookings =  detailBookings.filter((detail)=>{
                
            //     if (detail.booking.check_out <= new Date(startDate) && detail.booking.check_out >= new Date(Date.now()) || detail.booking.check_in >= new Date(endDate)) {
            //         return false;
            //     } else
            //     return true;
            //  });
            detailBookings = detailBookings.filter((detail) => {
                // Convert booking check-out and check-in dates to Date objects
                let checkOutDate = new Date(detail.booking.check_out);
                let checkInDate = new Date(detail.booking.check_in);
                let currentDate = new Date();
            
                // Create a new Date object from startDate and add 1 day
                let startDateAdjusted = new Date(startDate);
                startDateAdjusted.setDate(startDateAdjusted.getDate() + 1); // Add one day
            
                // Check the conditions for filtering
                if (
                    (checkOutDate <= startDateAdjusted && checkOutDate >= currentDate) ||
                    checkInDate >= new Date(endDate)
                ) {
                    return false; // Exclude this detailBooking
                }
                return true; // Include this detailBooking
            });
             let roomBooked = detailBookings.map((detail)=>{
                if (detail.status === "Đang đặt") {
                    return detail.room._id.toString();
                }
             });
     
             //lấy danh sách rooms kh có những phòng đã được đặt.
             rooms = rooms.filter((room)=>{
                 return !roomBooked.includes(room._id.toString());
             })
        }
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
        //danh sách giảm giá của từng loại phòng ở hotel
        const today = new Date();
        // thêm điều kiện mã giảm giá phải còn hữu hiệu khi người dùng đặt phòng
        let discounts = await discountRepo.select({
            type_room: typeOfRoom,
            hotel:hotel,
            date_end: { $gt: today }
        });
        discounts.sort((a, b) => a.discount_percent - b.discount_percent);
        let discount = 0;
        if(discounts.length > 0){
            discount = discounts[0].discount_percent;
        }
        result.push({
            ...typeOfRoom._doc,
            rooms: roomResult,
            discount: discount,
        })
    }
    return result;
}


module.exports =  getAllTypeRoomByHotel ;