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

    let bookings = await bookingRepo.select({
        $and: [
            {
                check_in: {
                    $gte: firstDay
                }
            },
            {
                check_out: {
                    $lte: lastDay
                }
            }
        ]
    });
    
    let details = await detailBookingRepo.select({
        booking: { $in: bookings },
    });
    details = details.filter((detail) => {
        return detail.room.hotel._id.toString() == hotel._id.toString();
    });

    let type_of_rooms = details.map((detail) => {
        return detail.room.type_room._id.toString();
    });

    const groupedByString = {};

    for (const str of type_of_rooms) {
        if (!groupedByString[str]) {
            groupedByString[str] = 0;
        }
        groupedByString[str]++;
    }

    const maxCount = Math.max(...Object.values(groupedByString));
    const minCount = Math.min(...Object.values(groupedByString));
    
    const maxCountKeys = Object.keys(groupedByString).filter(
        (key) => groupedByString[key] === maxCount
    );

    let typeOfRooms = await getAllTypeRoomByHotel(hotel);

    const bookedCountPerTypeRoom = {};

    Object.keys(groupedByString).forEach(key => {
        const value = groupedByString[key];
        const roomName = typeOfRooms.find((typeRoom) => {
            return typeRoom._id.toString() === key;
        }).name;
        bookedCountPerTypeRoom[roomName] = value;
    });

    typeOfRooms = typeOfRooms.filter((typeOfRoom) => {
        return maxCountKeys.includes(typeOfRoom._id.toString());
    });

    console.log(bookedCountPerTypeRoom);

    return {
        typeOfRooms: typeOfRooms,
        maxCount: maxCount,
        minCount:minCount,
        bookedCountPerTypeRoom: bookedCountPerTypeRoom,
    };
}

module.exports = bestTypeRoom;
