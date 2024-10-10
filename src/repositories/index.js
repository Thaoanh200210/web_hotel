const { BookingRepository } = require("./booking");
const { DetailBookingRepository } = require("./detail_of_booking");
const { EventRepository } = require("./event");
const { HotelRepository } = require("./hotel");
const { ImageRepository } = require("./image");
const { PaymentRepository } = require("./payment");
const { ReviewRepository } = require("./review");
const { RoleRepository } = require("./role");
const { RoomRepository } = require("./room");
const { ServiceHotelRepository } = require("./service_hotel");
const { SelectionRoomRepository } = require("./selection_of_room");
const { SelectionRepository } = require("./selection");
const { ServiceRoomRepository } = require("./service_of_room");
const { ServiceRepository } = require("./service");
const { TypeRoomRepository } = require("./type_of_room");
const { UserRepository } = require("./user");
const {EmployeeRepository} = require("./employee");
const {DiscountRepository} = require( "./discount");
const {CityRepository} = require( "./city");
const {FinalRepository} = require( "./final");
const {ServiceQuantityRepository} = require( "./service_quantity");

module.exports = {
    DiscountRepository,
    EmployeeRepository,
    BookingRepository,
    CityRepository,
    ServiceQuantityRepository,
    FinalRepository,
    DetailBookingRepository,
    EventRepository,
    HotelRepository,
    ImageRepository,
    PaymentRepository,
    ReviewRepository,
    RoleRepository,
    RoomRepository,
    SelectionRoomRepository,
    SelectionRepository,
    ServiceRoomRepository,
    ServiceRepository,
    ServiceHotelRepository,
    TypeRoomRepository,
    UserRepository
};