const { Booking } = require("./booking");
const { DetailBooking } = require("./detail_of_booking");
const { Event } = require("./event");
const { Hotel } = require("./hotel");
const { Image } = require("./image");
const { Payment } = require("./payment");
const { Review } = require("./review");
const { Role } = require("./role");
const { Room } = require("./room");
const { SelectionRoom } = require("./selection_of_room");
const { Selection } = require("./selection");
const { ServiceRoom } = require("./service_of_room");
const { Service } = require("./service");
const { TypeRoom } = require("./type_of_room");
const { User } = require("./user");
const {Employee} = require("./employee");
const {Discount} = require("./discount");
const {City} = require("./city");
module.exports = {
    Employee,
    Booking,
    DetailBooking,
    Event,
    Hotel,
    Image,
    Payment,
    City,
    Review,
    Role,
    Discount,
    Room,
    SelectionRoom,
    Selection,
    ServiceRoom,
    Service,
    TypeRoom,
    User
};