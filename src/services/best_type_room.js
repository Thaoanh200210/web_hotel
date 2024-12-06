const { get } = require('config');
const { BookingRepository, DetailBookingRepository } = require('../repositories/index');
const getAllTypeRoomByHotel = require("./get_all_type_of_room_by_hotel");

async function bestTypeRoom(hotel, period = "", type = "month") {
    const bookingRepo = new BookingRepository();
    const detailBookingRepo = new DetailBookingRepository();
    
    let firstDay, lastDay;

    if (type === "month" && period) {
        const [inputYear, inputMonth] = period.split('-').map(Number);
        const monthIndex = inputMonth - 1; // Tháng trong JavaScript bắt đầu từ 0 (0 = tháng 1)
        firstDay = new Date(Date.UTC(inputYear, monthIndex, 1));
        lastDay = new Date(Date.UTC(inputYear, monthIndex + 1, 0));
    } else if (type === "quarter" && period) {
        const [inputYear, inputQuarter] = period.split('-').map(Number);
        const startMonth = (inputQuarter - 1) * 3; // Xác định tháng bắt đầu của quý
        firstDay = new Date(Date.UTC(inputYear, startMonth, 1));
        lastDay = new Date(Date.UTC(inputYear, startMonth + 3, 0));
    } else if (type === "year" && period) {
        const inputYear = parseInt(period, 10);
        firstDay = new Date(Date.UTC(inputYear, 0, 1));
        lastDay = new Date(Date.UTC(inputYear, 12, 0));
    } else {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth(); // Lấy tháng hiện tại
        firstDay = new Date(Date.UTC(currentYear, currentMonth, 1));
        lastDay = new Date(Date.UTC(currentYear, currentMonth + 1, 0));
    }

    // Chỉ lấy các booking có ngày check_in thuộc khoảng thời gian được chỉ định
    let bookings = await bookingRepo.select({
        check_in: {
            $gte: firstDay, // Ngày check-in phải lớn hơn hoặc bằng firstDay (ngày đầu tháng)
            $lt: lastDay // Ngày check-in phải nhỏ hơn lastDay (ngày cuối tháng)
        }
    });
    
    // Lọc các booking chi tiết liên quan đến khách sạn hiện tại
    let details = await detailBookingRepo.select({
        booking: { $in: bookings },
    });
    details = details.filter((detail) => {
        return detail.room.hotel._id.toString() == hotel._id.toString();
    });

    // Lấy danh sách các loại phòng từ chi tiết booking
    let type_of_rooms = details.map((detail) => {
        return detail.room.type_room._id.toString();
    });

    // Đếm số lần đặt cho từng loại phòng
    const groupedByString = {};

    for (const str of type_of_rooms) {
        if (!groupedByString[str]) {
            groupedByString[str] = 0;
        }
        groupedByString[str]++;
    }

    // Tìm số lần đặt phòng nhiều nhất và ít nhất
    const maxCount = Math.max(...Object.values(groupedByString));
    const minCount = Math.min(...Object.values(groupedByString));
    
    // Lấy danh sách các loại phòng có lượt đặt nhiều nhất
    const maxCountKeys = Object.keys(groupedByString).filter(
        (key) => groupedByString[key] === maxCount
    );

    // Lấy thông tin các loại phòng từ khách sạn
    let typeOfRooms = await getAllTypeRoomByHotel(hotel);

    // Tạo danh sách số lượt đặt phòng cho từng loại phòng
    const bookedCountPerTypeRoom = {};

    Object.keys(groupedByString).forEach(key => {
        const value = groupedByString[key];
        const roomName = typeOfRooms.find((typeRoom) => {
            return typeRoom._id.toString() === key;
        }).name;
        bookedCountPerTypeRoom[roomName] = value;
    });

    // Lọc danh sách loại phòng chỉ chứa các loại có lượt đặt nhiều nhất
    typeOfRooms = typeOfRooms.filter((typeOfRoom) => {
        return maxCountKeys.includes(typeOfRoom._id.toString());
    });

    // Tìm tên loại phòng có lượt đặt nhiều nhất và ít nhất
    function getKeyByValue(obj, value) {
        return Object.keys(obj).find(key => obj[key] === value);
    }
    const maxName = getKeyByValue(bookedCountPerTypeRoom, maxCount)
    const minName = getKeyByValue(bookedCountPerTypeRoom, minCount)

    return {
        typeOfRooms: typeOfRooms,
        maxCount: maxCount,
        minCount: minCount,
        maxName: maxName,
        minName: minName,
        bookedCountPerTypeRoom: bookedCountPerTypeRoom,
    };
}

module.exports = bestTypeRoom;
