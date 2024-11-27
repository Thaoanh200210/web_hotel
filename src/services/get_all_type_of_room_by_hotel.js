const {
    TypeRoomRepository, 
    RoomRepository,
    ServiceRoomRepository,
    SelectionRoomRepository,
    ImageRepository,
    DiscountRepository,
    DetailBookingRepository
} = require('../repositories/index');

async function getAllTypeRoomByHotel(hotel, startDate = "", endDate = "") {
    const typeRoomRepo = new TypeRoomRepository();
    const roomRepo = new RoomRepository();
    const serviceRoomRepo = new ServiceRoomRepository();
    const detailBookingRepo = new DetailBookingRepository();
    const selectionRoomRepo = new SelectionRoomRepository();
    const imageRepo = new ImageRepository();
    const discountRepo = new DiscountRepository();

    let typesOfRoom = await typeRoomRepo.select({ hotel: hotel });
    let result = [];

    for (let typeOfRoom of typesOfRoom) {
        let rooms = await roomRepo.select({ hotel: hotel, type_room: typeOfRoom, status: 'Đang hoạt động' });
        
        if (startDate && endDate) {
            let detailBookings = await detailBookingRepo.select({
                room: { "$in": rooms },
                status: { "$in": ["Đang đặt", "Đã nhận phòng"] }
            });

            // Lọc các bản ghi đặt phòng trong khoảng startDate và endDate
            // detailBookings = detailBookings.filter(detail => {
            //     const checkIn = new Date(detail.booking.check_in);
            //     const checkOut = new Date(detail.booking.check_out);
            //     const start = new Date(startDate);
            //     const end = new Date(endDate);

            //     // Nếu khoảng thời gian đặt phòng trùng với startDate và endDate, loại bỏ phòng này
            //     return (
            //         (checkIn <= end && checkOut >= start) // Phòng đã đặt trong khoảng thời gian
            //     );
            // });
            detailBookings = detailBookings.filter((detail) => {
                // Convert check-in and check-out dates to Date objects
                let checkInDate = new Date(detail.booking.check_in);
                let checkOutDate = new Date(detail.booking.check_out);
          
                // Create a new Date object from startDate and add 1 day
                let startDateAdjusted = new Date(startDate);
                startDateAdjusted.setDate(startDateAdjusted.getDate() + 1); // Add one day
          
                // Get the current date
                let currentDate = new Date();
          
                // Check if the detailBooking should be included based on the dates
                if (
                  (checkOutDate <= startDateAdjusted && checkOutDate >= currentDate) ||
                  checkInDate >= new Date(endDate)
                ) {
                  return false; // Exclude this detailBooking
                }
                return true; // Include this detailBooking
              });

            // Tạo danh sách ID các phòng đã đặt trong khoảng thời gian đó
            const roomBooked = detailBookings.map(detail => detail.room._id.toString());

            // Loại bỏ các phòng đã đặt khỏi danh sách rooms
            rooms = rooms.filter(room => !roomBooked.includes(room._id.toString()));
        }

        // Duyệt qua danh sách phòng còn lại để lấy thông tin chi tiết
        let roomResult = [];
        for (let room of rooms) {
            let servicesOfRoom = await serviceRoomRepo.select({ room: room });
            let selectionsOfRoom = await selectionRoomRepo.select({ room: room });
            let imagesOfRoom = await imageRepo.select({ room: room });
            roomResult.push({
                ...room._doc,
                services: servicesOfRoom.map(serviceOfRoom => serviceOfRoom.service),
                selections: selectionsOfRoom.map(selectionOfRoom => selectionOfRoom.selection),
                images: imagesOfRoom
            });
        }

        roomResult.sort((a, b) => a.original_price - b.original_price);

        // Lấy giảm giá hiện có của loại phòng
        const today = new Date();
        let discounts = await discountRepo.select({
            type_room: typeOfRoom,
            hotel: hotel,
            date_end: { $gt: today }
        });
        discounts.sort((a, b) => a.discount_percent - b.discount_percent);
        let discount = discounts.length > 0 ? discounts[0].discount_percent : 0;

        result.push({
            ...typeOfRoom._doc,
            rooms: roomResult,
            discount: discount,
        });
    }

    return result;
}

module.exports = getAllTypeRoomByHotel;
