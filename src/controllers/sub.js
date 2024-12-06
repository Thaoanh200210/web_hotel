const defaultData = require("../helper/default-data")
const defaultSubNav = require("../helper/default-sub-nav")
const message = require("../helper/message")
const writeFile = require("../helper/file")
const fs = require("fs");
const path = require("path");
const { CookieProvider } = require("../helper/cookies")
const uploadImageFromLocal = require("../services/upload_image_from_local")
const updateHotel = require("../services/update_hotel");
const getAllRooms = require("../services/get_all_rooms")
const getAllBookings = require("../services/get_all_booking")
const getAllServiceHotel = require("../services/get_all_service_hotel")
const getAllBookingDetails = require("../services/get_all_detai_booking")
const getAllUsersByHotel = require("../services/get_all_user_by_hotel")
const getAllUserBookingInHotels = require("../services/get_all_user_booking_in_hotel")
const getAllRole = require("../services/get_all_role")
const getAllUsers = require("../services/get_all_user")
const getAllCity = require("../services/get_all_city")
const getAllEvents = require("../services/get_all_event")
const getAllReviews = require("../services/get_all_review")
const getAllTypeRooms = require("../services/get_all_type_of_rooms")
const getAllTypeRoomByHotel = require("../services/get_all_type_of_room_by_hotel")
const getAllSelection = require("../services/get_all_selection")
const getAllService = require("../services/get_all_service")

const getAllServiceQuantity = require("../services/get_all_service_quantity")
const getAllServicesQuantityOfDetail = require("../services/get_all_service_quantity_of_booking")

const getAllTypeRoom = require("../services/get_all_type_of_rooms")
const getAllDetailBookingByIdBookings = require("../services/get_all_detail_booking_by_id_booking")
const getTypeRoomById = require("../services/get_type_room_by_id")
const getTypeRoomByIdAndHotel = require("../services/get_type_of_room_by_id_and_hotel")
const getCurrentEvent = require("../services/get_current_event")
const getServiceById = require("../services/get_service_by_id")
const getServiceHotelById = require("../services/get_service_hotel_by_id")
const getServiceQuantityById = require("../services/get_service_quantity_by_id")
const getRoomById = require("../services/get_room_by_id")
const getRoomByHotel = require("../services/get_room_by_hotel")
const getDiscountById = require("../services/get_discount_by_id")
const getBookingDetailById = require("../services/get_detail_booking_by_id")
const getBookingById = require("../services/get_booking_by_id")
const getReviewById = require("../services/get_review_by_id")
const getFinalByIdBooking = require("../services/get_final_by_id_booking")
const getFinalByBookingId = require("../services/get_final_by_booking_id")
const getPaymentByIdBooking = require("../services/get_payment_by_booking_id")
const getEventById = require("../services/get_event_by_id")
const getUserById = require("../services/get_user_by_id")
const getSelectionById = require("../services/get_selection_by_id")
const getImageByFilter = require("../services/get_image_by_filter")
const getAllDiscounts = require("../services/get_all_discount")
const getCityByID = require("../services/get_city_by_id")
const createBookingDetails = require("../services/create_booking_detail")
const createBookings = require("../services/create_booking")
const createRoom = require("../services/create_room")
const createUser = require("../services/create_user")
const createEvent = require("../services/create_event")
const createDiscount = require("../services/create_discount")
const createEmployee = require("../services/create_employee");
const createImage = require("../services/create_image")
const createTypeRoom = require("../services/create_type_room")
const createFinal = require("../services/create_final")
const createService = require("../services/create_service")
const createServiceHotel = require("../services/create_service_hotel")
const createSelection = require("../services/create_selection")
const createServiceRoom = require("../services/create_service_room")
const createSelectionRoom = require("../services/create_selection_room")
const createServiceQuantity = require("../services/create_service_quantity")
const updateRoom = require("../services/update_room");
const updateUser = require("../services/update_user");
const updateEvent = require("../services/update_event");
const updateDiscount = require("../services/update_discount");
const updateSelection = require("../services/update_selection")
const updateService = require("../services/update_service")
const updateServiceHotel = require("../services/update_service_hotel")
const updateTypeRoom = require("../services/update_type_room")
const updateBooking = require("../services/update_booking");
const updateBookingDetail = require("../services/update_detail_booking")
const deleteServiceRoomByFilter = require("../services/delete_service_room_by_filter");
const deleteSelectionRoomByFilter = require("../services/delete_selection_room_by_filter");
const deleteImageByFilter = require("../services/delete_image_by_filter");
const deleteRoom = require("../services/delete_room");
const deleteEvent = require("../services/delete_event");
const deleteSelection = require("../services/delete_selection")
const deleteService = require("../services/delete_service")
const deleteServiceHotel = require("../services/delete_service_hotel")
const deleteServiceQuantity = require("../services/delete_service_quantity")
const deleteTypeRoom = require("../services/delete_type_room")
const deleteDiscount = require("../services/delete_discount");
const deleteUser = require("../services/delete_user");
const deleteReview = require("../services/delete_review")
const deleteEmployee = require("../services/delete_employee");
const deleteBooking = require("../services/delete_booking");
const numberOfRoomByHotel = require("../services/number_of_room_by_hotel")
const numberOfEventByHotel = require("../services/number_of_event_by_hotel")
const numberOfUser = require("../services/number_of_user")
const numberOfBookingByHotel = require("../services/number_of_booking_by_hotel")
const bestTypeRoom = require("../services/best_type_room");
const getHotelById = require("../services/get_hotel_by_id");
const constants = require("../constants")
const constantMesages = require("../constants/message");
const { RoleEnum } = require("../models/enum/role");
const { BookingStatusEnum } = require("../models/enum/booking_status");

class SubController {
    //quản lý phòng
    async room(req, res) {
        let rooms = await getAllRooms({
            hotel: req.hotel,
        });
        res.render("index-manager", {
            page: "sub/index",
            roomPage: "room/management",
            rooms: rooms,
            ...defaultSubNav(),
            ...defaultData(req)
        })
    }


    async roomDetail(req, res) {
        let room = await getRoomById(req.params.id, true);
        res.render("index-manager", {
            page: "sub/index",
            roomPage: "room/detail",
            room: room,
            ...defaultSubNav(),
            ...defaultData(req)
        })
    }

    async addRoom(req, res) {
        let typeRooms = await getAllTypeRooms(req.hotel);
        let serviceRooms = await getAllService({
            hotel: req.hotel,
        });
        let selectionRooms = await getAllSelection({
            hotel: req.hotel,
        });
        res.render("index-manager", {
            page: "sub/index",
            roomPage: "room/add",
            typeRooms: typeRooms,
            serviceRooms: serviceRooms,
            selectionRooms: selectionRooms,
            ...defaultSubNav(),
            ...defaultData(req)
        })
    }


    async addRoomHandler(req, res) {
        let typeRoom = await getTypeRoomById(req.body.loaiphong);
        let images = req.files.hinhanh;
        let services = req.body.dichvu;
        let selections = req.body.luachon;

        let room = {
            hotel: req.hotel,
            name: req.body.tenphong,
            original_price: req.body.giaphong,
            number_room: req.body.sophong,
            description: req.body.mota,
            type_room: typeRoom,
        }
        let roomResult = await createRoom(room);
        if (typeof services == "string") {
            let service = await getServiceById(services);
            let serviceRoom = {
                room: roomResult,
                service: service,
            }
            await createServiceRoom(serviceRoom);
        } else {
            for (let serviceId of services) {
                let service = await getServiceById(serviceId);
                let serviceRoom = {
                    room: roomResult,
                    service: service,
                }
                await createServiceRoom(serviceRoom);
            }
        }
        if (typeof selections == "string") {
            let selection = await getSelectionById(selections);
            let selectionRoom = {
                room: roomResult,
                selection: selection,
            }
            await createSelectionRoom(selectionRoom);
        } else {
            for (let selectionId of selections) {
                let selection = await getSelectionById(selectionId);
                let selectionRoom = {
                    room: roomResult,
                    selection: selection,
                }
                await createSelectionRoom(selectionRoom);
            }
        }



        for (let image of images) {
            let savedImage = writeFile(
                image.buffer,
                image.mimetype
            );
            let data = {
                url: `/uploads/${savedImage}`,
                room: roomResult
            }
            await createImage(data);
        }
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã thêm phòng mới thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/sub/" + req.hotel._id + "/room/");

    }

    async editRoom(req, res) {
        let room = await getRoomById(req.params.id, true);
        let typeRooms = await getAllTypeRooms(req.hotel);
        let serviceRooms = await getAllService({
            hotel: req.hotel,
        });
        let selectionRooms = await getAllSelection({
            hotel: req.hotel,
        });
        const status = ['Đang hoạt động', 'Dừng hoạt động'];

        res.render("index-manager", {
            page: "sub/index",
            roomPage: "room/edit",
            room: room,
            typeRooms: typeRooms,
            serviceRooms: serviceRooms,
            selectionRooms: selectionRooms,
            status: status,
            ...defaultSubNav(),
            ...defaultData(req)
        })
    }

    async editRoomHandler(req, res) {
        let originRoom = await getRoomById(req.params.id, false);
        let typeRoom = await getTypeRoomById(req.body.loaiphong);
        let images = req.files.hinhanh;
        let services = req.body.dichvu;
        let selections = req.body.luachon;

        originRoom.hotel = req.hotel;
        originRoom.name = req.body.tenphong;
        originRoom.original_price = req.body.giaphong;
        originRoom.number_room = req.body.sophong;
        originRoom.description = req.body.mota;
        originRoom.type_room = typeRoom;
        originRoom.status = req.body.tinhtrang;

        await updateRoom(originRoom);
        await deleteServiceRoomByFilter({ room: originRoom })
        await deleteSelectionRoomByFilter({ room: originRoom })
        if (typeof services == "string") {
            let service = await getServiceById(services);
            let serviceRoom = {
                room: originRoom,
                service: service,
            }
            await createServiceRoom(serviceRoom);
        } else {
            for (let serviceId of services) {
                let service = await getServiceById(serviceId);
                let serviceRoom = {
                    room: originRoom,
                    service: service,
                }
                await createServiceRoom(serviceRoom);
            }
        }
        if (typeof selections == "string") {
            let selection = await getSelectionById(selections);
            let selectionRoom = {
                room: originRoom,
                selection: selection,
            }
            await createSelectionRoom(selectionRoom);
        } else {
            for (let selectionId of selections) {
                let selection = await getSelectionById(selectionId);
                let selectionRoom = {
                    room: originRoom,
                    selection: selection,
                }
                await createSelectionRoom(selectionRoom);
            }
        }
        if (images != undefined && images.length != 0) {
            let oldImages = await getImageByFilter({ room: originRoom })
            for (let image of oldImages) {
                let filePath = path.join(__dirname, "..", "public") + image.url;
                fs.unlinkSync(filePath);
            }
            await deleteImageByFilter({ room: originRoom })

            for (let image of images) {
                let savedImage = writeFile(
                    image.buffer,
                    image.mimetype
                );
                let data = {
                    url: `/uploads/${savedImage}`,
                    room: originRoom
                }
                await createImage(data);
            }
        }

        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã sửa thông tin phòng thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/sub/" + req.hotel._id + "/room/");

    }

    async deleteRoomHandler(req, res) {
        try {
            let originRoom = await getRoomById(req.params.id, false);
            let oldImages = await getImageByFilter({ room: originRoom })
            for (let image of oldImages) {
                let filePath = path.join(__dirname, "..", "public") + image.url;
                fs.unlinkSync(filePath);
            }
            await deleteImageByFilter({ room: originRoom })
            await deleteServiceRoomByFilter({ room: originRoom })
            await deleteSelectionRoomByFilter({ room: originRoom })
            await deleteRoom(originRoom._id.toString())
        } catch (e) {
            console.log(e);
        }

        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã xóa thông tin phòng thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/sub/" + req.hotel._id + "/room/");
    }

    //quản lý giảm giá
    async discount(req, res) {
        let discounts = await getAllDiscounts(req.hotel);
        res.render("index-manager", {
            page: "sub/index",
            roomPage: "discount/management",
            discounts: discounts,
            ...defaultSubNav(),
            ...defaultData(req)
        })
    }

    async addDiscount(req, res) {
        let type_rooms = await getAllTypeRooms(req.hotel);
        res.render("index-manager", {
            page: "sub/index",
            roomPage: "discount/add",
            type_rooms: type_rooms,
            ...defaultSubNav(),
            ...defaultData(req)
        })
    }

    async addDiscountHandler(req, res) {
        let type_room = await getTypeRoomById(req.body.phong);
        let discount = {
            name: req.body.tengiamgia,
            type_room: type_room,
            hotel: req.hotel,
            discount_percent: req.body.phantram,
            date_start: req.body.ngaydau,
            date_end: req.body.ngayket,
        }
        await createDiscount(discount);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã thêm giảm giá mới thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/sub/" + req.hotel._id + "/discount/");
    }

    async editDiscount(req, res) {
        let discount = await getDiscountById(req.params.id);
        let type_rooms = await getAllTypeRooms(req.hotel);
        res.render("index-manager", {
            page: "sub/index",
            roomPage: "discount/edit",
            discount: discount,
            type_rooms: type_rooms,
            ...defaultSubNav(),
            ...defaultData(req)
        })
    }

    async editDiscountHandler(req, res) {
        let originDiscount = await getDiscountById(req.params.id);
        let type_room = await getTypeRoomById(req.body.phong);
        originDiscount.hotel = req.hotel;
        originDiscount.name = req.body.tengiamgia;
        originDiscount.type_room = type_room;
        originDiscount.discount_percent = req.body.phantram;
        originDiscount.date_start = req.body.ngaydau;
        originDiscount.date_end = req.body.ngayket;

        await updateDiscount(originDiscount);

        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã sửa thông tin giảm giá thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/sub/" + req.hotel._id + "/discount/");

    }

    async deleteDiscountHandler(req, res) {
        try {
            let originDiscount = await getDiscountById(req.params.id);
            await deleteDiscount(originDiscount._id.toString())
        } catch (e) {
            console.log(e);
        }

        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã xóa thông tin giảm giá thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/sub/" + req.hotel._id + "/discount/");
    }

    //quản lý khách hàng
    async customer(req, res) {
        let bookings = await getAllBookings(req.hotel); // Lấy tất cả các booking của khách sạn
        
        // Sử dụng Set để lưu trữ ID khách hàng không trùng lặp
        const customerMap = new Map();
    
        bookings.forEach(booking => {
            if (booking.customer && !customerMap.has(booking.customer._id.toString())) {
                customerMap.set(booking.customer._id.toString(), booking.customer);
            }
        });
    
        // Lấy danh sách khách hàng duy nhất từ Map
        const uniqueCustomers = Array.from(customerMap.values());
    
    
        res.render("index-manager", {
            page: "sub/index",
            roomPage: "customer/management",
            users: uniqueCustomers,
            ...defaultSubNav(),
            ...defaultData(req)
        });
    }
    

    async addCustomer(req, res) {
        res.render("index-manager", {
            page: "sub/index",
            roomPage: "customer/add",
            ...defaultSubNav(),
            ...defaultData(req)
        })
    }

    async addCustomerHandler(req, res) {
        let user = {
            name: req.body.tenkhachhang,
            phone: req.body.sodienthoai,
            email: req.body.email,
            password: req.body.matkhau
        }
        await createUser(user);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã thêm khách hàng mới thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/sub/" + req.hotel._id + "/customer");

    }

    async editCustomer(req, res) {
        let currentUser = await getUserById(req.params.id);
        res.render("index-manager", {
            page: "sub/index",
            roomPage: "customer/edit",
            currentUser: currentUser,
            ...defaultSubNav(),
            ...defaultData(req)
        })
    }

    async editCustomerHandler(req, res) {
        let originUser = await getUserById(req.params.id);

        originUser.name = req.body.tenkhachhang;
        originUser.phone = req.body.sodienthoai;
        originUser.email = req.body.email;

        await updateUser(originUser);

        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã sửa thông tin khách hàng thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/sub/" + req.hotel._id + "/customer/");

    }

    async deleteCustomerHandler(req, res) {
        try {
            let originEvent = await getUserById(req.params.id);
            await deleteUser(originEvent._id.toString())
        } catch (e) {
            console.log(e);
        }

        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã xóa thông tin khách hàng thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/sub/" + req.hotel._id + "/user/customer/");
    }



    //quản lý đặt phòng
    async booking(req, res) {
        let bookings = await getAllBookings(req.hotel);
        let details = await getAllBookingDetails(req.hotel);
        bookings.sort((a, b) => new Date(b.check_in) - new Date(a.check_in));
        let getStatus = (booking) => {
            if (booking.deleteAt || booking.status == "Đã hủy") {
                return 'Đã bị hủy';
            } else if (booking.status == BookingStatusEnum.CheckedOut) {
                return 'Đã trả phòng';
            } else if (booking.status == BookingStatusEnum.CheckedIn) {
                return 'Đang nhận phòng';
            } else if (booking.status == BookingStatusEnum.Reserved) {
                return 'Đã đặt phòng';
            }
        }

        let getRoom = (details, booking) => {
            let result = '';
            details.forEach((detail) => {
                if (detail.booking._id.toString() == booking.toString()) {
                    result = detail.room.number_room;
                }
            })
            return result;
        }
        res.render("index-manager", {
            page: "sub/index",
            roomPage: "booking/management",
            bookings: bookings,
            details: details,
            getStatus: getStatus,
            getRoom: getRoom,
            ...defaultSubNav(),
            ...defaultData(req)
        })
    }

    // async editBookingStatus(req, res) {
    //     let booking = await getBookingById(req.params.id);
    //     let detail = await getBookingDetailById(req.params.id);
    //     let service_hotels = await getAllServiceHotel({ hotel: req.hotel });
    //     let service_quantitys = await getAllServiceQuantity({ detail_booking: detail });
    //     let getStatus = (booking) => {
    //         if (booking.deleteAt || booking.status == "Đã hủy") {
    //             return 'Đã bị hủy';
    //         } else if (booking.status == BookingStatusEnum.CheckedOut) {
    //             return 'Đã trả phòng';
    //         } else if (booking.status == BookingStatusEnum.CheckedIn) {
    //             return 'Đang nhận phòng';
    //         } else if (booking.status == BookingStatusEnum.Reserved) {
    //             return 'Đã đặt phòng';
    //         }
    //     }

    //     res.render("index-manager", {
    //         page: "manager/index",
    //         roomPage: "booking/status_booking",
    //         id: req.params.id,
    //         booking: booking,
    //         detail: detail,
    //         service_quantitys: service_quantitys,
    //         service_hotels: service_hotels,
    //         getStatus: getStatus,
    //         // getRoom: getRoom,
    //         ...defaultManagerNav(),
    //         ...defaultData(req)
    //     })
    // }

    async editBookingStatus(req, res) {
        let booking = await getBookingById(req.params.id);
        let payment = await getPaymentByIdBooking({booking: booking._id})
        let details = await getAllDetailBookingByIdBookings({
            booking: booking._id,
        }); 
        let final = await getFinalByIdBooking({
            booking: booking._id,
        });
        let cookies = new CookieProvider(req, res);
        let userString = cookies.getCookie(constants.user_info);
        let service_hotels = await getAllServiceHotel({ hotel: req.hotel });
        let service_quantitys = await getAllServicesQuantityOfDetail({ detail_booking: details });
        let getStatus = (booking) => {
            if (booking.deleteAt || booking.status == "Đã hủy") {
                return 'Đã bị hủy';
            } else if (booking.status == BookingStatusEnum.CheckedOut) {
                return 'Đã trả phòng';
            } else if (booking.status == BookingStatusEnum.CheckedIn) {
                return 'Đang nhận phòng';
            } else if (booking.status == BookingStatusEnum.Reserved) {
                return 'Đã đặt phòng';
            }
        }
    
        res.render("index-manager", {
            page: "sub/index",
            roomPage: "booking/status_booking",
            id: req.params.id,
            booking: booking,
            final:final,
            payment:payment,
            details: details, // Truyền mảng details vào view
            service_quantitys: service_quantitys,
            service_hotels: service_hotels,
            getStatus: getStatus,
            ...defaultSubNav(),
            ...defaultData(req)
        });
    }
    async findRoomEmpty(req, res){
        let booking = await getBookingById(req.params.id);
        let details = await getAllDetailBookingByIdBookings({
            booking: booking._id,
        }); 
        let ngaydau = req.query.ngaydau;
        let ngayket = req.query.ngayket;
        let events = await getCurrentEvent(req.hotel);
        let discounts = events.map(event => event.discount_percent);
        let maxDiscount = 0;
        if(discounts.length !=0 ){
            maxDiscount = Math.max.apply(null,discounts);
        }
        let discount =  maxDiscount/100;
        
        let typeRooms = await getAllTypeRoomByHotel(req.hotel, ngaydau, ngayket);
        res.render("index-manager", {
            page: "sub/index",
            roomPage: "booking/find_room_empty",
            booking: booking,
            ngaydau:ngaydau,
            typeRooms:typeRooms,
            details:details,
            discount:discount,
            ngayket:ngayket,
            ...defaultSubNav(),
            ...defaultData(req)
        })
    }

    async editStatusBookingHandler(req, res) {
        let booking = await getBookingById(req.params.id, false);
        let detailBookings = await getAllDetailBookingByIdBookings({
            booking: booking._id,
        }); 
        let { final_price, process_user, ngaytraphong,thuctephaitra } = req.body
        let user = await getUserById(process_user)
        if (req.body.status != "cancel") {
            booking.status = req.body.status;
            
            await updateBooking(booking);

            for( let detailBooking of detailBookings){
                detailBooking.status = req.body.status;
                console.log("booking id", booking._id)
                await updateBookingDetail(detailBooking._id,
                    detailBooking)
            }

            if (req.body.status === "Đã trả phòng") {
                await createFinal({
                    final_price: final_price,
                    NowDate: ngaytraphong,
                    booking: booking,
                    nhanvien: user,
                    tienthucte:thuctephaitra,
                })
            }
        } else {
            await deleteBooking(booking);
        }

        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã sửa trạng thái thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/sub/" + req.hotel._id + "/booking");
    }

    async serviceHotelBooking(req, res) {
        let booking = await getBookingById(req.params.id, false);
        let service_hotels = await getAllServiceHotel({ hotel: req.hotel, })
        res.render("index-manager", {
            page: "sub/index",
            roomPage: "booking/service_hotel",
            booking: booking,
            service_hotels: service_hotels,
            ...defaultSubNav(),
            ...defaultData(req)
        })
    }

    // async addHandlerServiceQuantity(req, res) {
    //     let booking = await getBookingById(req.params.id, false);
    //     let detailBooking = await getBookingDetailById(req.params.id)
    //     let serviceHotel = req.body.dichvuphong;
    //     let serviceHotelID = await getServiceHotelById(serviceHotel);

    //     let soluong = req.body.soluong;
    //     // Kiểm tra và lấy giá trị số lượng duy nhất
    //     let selectedQuantity = 0;

    //     if (Array.isArray(soluong)) {
    //         // Nếu là mảng, tìm số lượng khác rỗng
    //         selectedQuantity = soluong.find(q => q !== '') || 0; // Lấy giá trị đầu tiên không rỗng
    //     } else {
    //         // Nếu không phải là mảng, chỉ cần lấy giá trị
    //         selectedQuantity = soluong || 0;
    //     }

    //     // Chuyển đổi sang số nếu cần
    //     selectedQuantity = parseInt(selectedQuantity, 10);

    //     let serviceQuantity = {
    //         detail_booking: detailBooking._id,
    //         service_hotel: serviceHotelID._id,
    //         quatity: selectedQuantity,
    //     }
    //     await createServiceQuantity(serviceQuantity);
    //     let cookies = new CookieProvider(req, res);
    //     cookies.setCookie(
    //         constants.has_message,
    //         JSON.stringify(message("Bạn đã thêm dịch vụ thành công!", constantMesages.successCustom)),
    //         1
    //     );
    //     res.redirect("/manager/" + req.hotel._id + "/booking/status_booking/" + booking._id);

    // }
    async addHandlerServiceQuantity(req, res) {
        try {
            // Lấy thông tin booking và chi tiết booking
            let booking = await getBookingById(req.params.id, false);
            let detailBooking = await getBookingDetailById(req.params.id);
            let serviceHotels = req.body.dichvuphong; // Mảng các dịch vụ đã chọn
            let soluong = req.body.soluong; // Mảng số lượng tương ứng

            // Kiểm tra xem serviceHotels và soluong có phải là mảng và có cùng độ dài không
            if (Array.isArray(serviceHotels) && Array.isArray(soluong) && serviceHotels.length === soluong.length) {
                // Lặp qua từng dịch vụ đã chọn
                for (let i = 0; i < serviceHotels.length; i++) {
                    // Lấy thông tin dịch vụ theo ID
                    let serviceHotel = await getServiceHotelById(serviceHotels[i]);

                    // Kiểm tra nếu dịch vụ tồn tại và số lượng là hợp lệ
                    if (serviceHotel) {
                        let selectedQuantity = soluong[i] !== '' ? parseInt(soluong[i], 10) : 0;

                        // Chỉ thêm nếu số lượng lớn hơn 0
                        if (selectedQuantity > 0) {
                            let serviceQuantity = {
                                detail_booking: detailBooking._id,
                                service_hotel: serviceHotel._id,
                                quatity: selectedQuantity, // Sửa lỗi chính tả từ "quatity" thành "quantity"
                            };
                            await createServiceQuantity(serviceQuantity);
                        }
                    }
                }
            }

            // Thiết lập cookie và chuyển hướng về trang quản lý
            let cookies = new CookieProvider(req, res);
            cookies.setCookie(
                constants.has_message,
                JSON.stringify(message("Bạn đã thêm dịch vụ thành công!", constantMesages.successCustom)),
                1
            );
            res.redirect("/sub/" + req.hotel._id + "/booking/status_booking/" + booking._id);
        } catch (error) {
            console.error("Error in addHandlerServiceQuantity:", error);
            res.status(500).send("Có lỗi xảy ra, vui lòng thử lại sau.");
        }
    }


    async deleteserviceHotelBookingHandler(req, res) {

        try {
            let originServiceQuantity = await getServiceQuantityById(req.params.id);
            await deleteServiceQuantity(originServiceQuantity._id.toString())
        } catch (e) {
            console.log(e);
        }

        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã xóa thông tin dịch vụ thành công!", constantMesages.successCustom)),
            1
        );
        return res.redirect(req.get('referer'))
    }
    async addBooking(req, res) {
        let booking = await getBookingById(req.params.id);
        let rooms = await getAllRooms({
            hotel: req.hotel,
        });
        let selections = await getAllSelection({
            hotel: req.hotel,
        });
        let userID = booking.customer._id;

        res.render("index-manager", {
            page: "sub/index",
            roomPage: "booking/add",
            rooms: rooms,
            booking: booking,
            userID: userID,
            selections: selections,
            ...defaultSubNav(),
            ...defaultData(req)
        })

    }

    async addBookingHandler(req, res) {
        let selection = req.body.luachon;
        let ngaydau = req.body.ngaydau; // Lấy từ body thay vì body
        let ngayket = req.body.ngayket; // Lấy từ body thay vì query
        const now = new Date();
        
        let currentSelection = await getSelectionById(selection);
        let isCheckInWithCreditCard = currentSelection.name == 'Thanh toán online qua chuyển khoản';
        let events = await getCurrentEvent(req.hotel);
        let discounts = events.map(event => event.discount_percent);
        let maxDiscount = 0;
        if (discounts.length != 0) {
            maxDiscount = Math.max.apply(null, discounts);
        }

        let discount = maxDiscount / 100;
        let phongs = req.body.phong;
        let roomDetails  = []
        let total = 0;
        let numberOfDaysBooked = Math.floor((new Date(req.body.ngayket) - new Date(req.body.ngaydau)) / (86400 * 1000));
        if(typeof phongs == "string"){
            let room = await getRoomById(phongs,false);
            let typeRoom = await getTypeRoomByIdAndHotel(req.hotel,room.type_room._id.toString(),ngaydau,ngayket,true);
            discount = (discount > typeRoom.discount/100 ? discount : typeRoom.discount/100)
            if(discount){
                roomDetails.push({
                    original_price: room.original_price,
                    discount_price: discount * parseInt(room.original_price) * -1,
                    booking: null,
                    room: room,
                    NowDate: now,
                });
                total = total + (parseInt(room.original_price) - discount * parseInt(room.original_price)) * numberOfDaysBooked;
            }else{
                roomDetails.push({
                    original_price: room.original_price,
                    discount_price: 0,
                    booking: null,
                    room: room,
                    NowDate: now,
                });
                total = total + parseInt(room.original_price) * numberOfDaysBooked;
            }
        } else {
            for(let phong of phongs){
                let room = await getRoomById(phong,false);
                let typeRoom = await getTypeRoomByIdAndHotel(req.hotel,room.type_room._id.toString(),ngaydau,ngayket,true);
                discount = (discount > typeRoom.discount/100 ? discount : typeRoom.discount/100)
                if(discount){
                    roomDetails.push({
                        original_price: room.original_price,
                        discount_price: discount * parseInt(room.original_price) * -1,
                        booking: null,
                        room: room,
                        NowDate: now,
                    });
                    total = total + (parseInt(room.original_price) - discount * parseInt(room.original_price)) * numberOfDaysBooked;
                }else{
                    roomDetails.push({
                        original_price: room.original_price,
                        discount_price: 0,
                        booking: null,
                        room: room,
                        NowDate: now,
                    });
                    total = total + parseInt(room.original_price) * numberOfDaysBooked;
                }
            }
        }
 
        let bookingID = await getBookingById(req.params.id);
        let userID = bookingID.customer._id;
        let booking = {
            customer: userID,
            check_in: new Date(req.body.ngaydau).setHours(14),
            check_out: new Date(req.body.ngayket).setHours(12),
            customer_identify_number: req.body.chungminhnhandan,
            total_price: total,
        }
        let currenrtBooking = await createBookings(booking);
        roomDetails = roomDetails.map(x => {
            x.booking = currenrtBooking;
            return x;
        })
        
        for(let item of roomDetails){
            await createBookingDetails(item) ;
        }
        if(isCheckInWithCreditCard){
            return res.redirect("/payment/create_payment_url/" + currenrtBooking._id + "?amount=" + total)
        }
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã đặt phòng thành công!", constantMesages.successCustom)),
            1
        );
        return res.redirect("/sub/" + req.hotel._id + "/booking")
    }

    //Đánh giá
    async review(req, res) {
        let reviews = await getAllReviews(req.hotel);
        res.render("index-manager", {
            page: "sub/index",
            roomPage: "review/management",
            reviews: reviews,
            ...defaultSubNav(),
            ...defaultData(req)
        })
    }

    async reviewDetail(req, res) {
        let review = await getReviewById(req.params.id);
        res.render("index-manager", {
            page: "sub/index",
            roomPage: "review/detail",
            review: review,
            ...defaultSubNav(),
            ...defaultData(req)
        })
    }

    async deleteReviewHandler(req, res) {
        try {
            let originServiceHotel = await getReviewById(req.params.id);
            await deleteReview(originServiceHotel._id.toString())
         
        } catch (e) {
            console.log(e);
        }

        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã xóa đánh giá thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/sub/" + req.hotel._id + "/review");
    }

}
module.exports = { SubController }