const { RoleEnum } = require('../models/enum/role');
const { BookingRepository } = require('../repositories/index');

async function getAllUserBookingInHotels(hotelId) {
    const bookingRepo = new BookingRepository();
    
    // Retrieve all bookings for the specified hotel
    let bookings = await bookingRepo.select({
        hotel: hotelId,
    });
    
    // Filter out distinct customers with RoleEnum.Customer and map to user data
    const customers = [];
    const customerIds = new Set();
    
    bookings.forEach(booking => {
        if (booking.customer && booking.customer.role === RoleEnum.Customer && !customerIds.has(booking.customer._id.toString())) {
            customers.push(booking.customer);
            customerIds.add(booking.customer._id.toString());
        }
    });
    
    return customers;
}

module.exports = getAllUserBookingInHotels;
