const defaultData = require("../helper/default-data")
const defaultManagerNav = require("../helper/default-manager-nav")
const message = require("../helper/message")
const writeFile = require("../helper/file")
const fs = require("fs");
const path = require("path");
const { CookieProvider } = require("../helper/cookies")
const uploadImageFromLocal = require("../services/upload_image_from_local")
const updateHotel = require("../services/update_hotel");
const getAllRooms = require("../services/get_all_rooms")
const getAllBookings = require("../services/get_all_booking")
const getAllBookingDetails = require("../services/get_all_detai_booking")
const getAllUsersByHotel = require("../services/get_all_user_by_hotel")
const getAllRole = require("../services/get_all_role")
const getAllUsers = require("../services/get_all_user")
const getAllCity = require("../services/get_all_city")
const getAllEvents = require("../services/get_all_event")
const getAllReviews = require("../services/get_all_review")
const getAllTypeRooms = require("../services/get_all_type_of_rooms")
const getAllSelection = require("../services/get_all_selection")
const getAllService = require("../services/get_all_service")
const getAllServiceHotel = require("../services/get_all_service_hotel")
const getAllServiceQuantity = require("../services/get_all_service_quantity")
const getAllTypeRoom = require("../services/get_all_type_of_rooms")
const getAllDetailBookingByIdBookings = require("../services/get_all_detail_booking_by_id_booking")
const getTypeRoomById = require("../services/get_type_room_by_id")
const getTypeRoomByIdAndHotel = require("../services/get_type_of_room_by_id_and_hotel")
const getCurrentEvent = require("../services/get_current_event")
const getServiceById = require("../services/get_service_by_id")
const getServiceHotelById = require("../services/get_service_hotel_by_id")
const getServiceQuantityById = require("../services/get_service_quantity_by_id")
const getRoomById = require("../services/get_room_by_id")
const getDiscountById = require("../services/get_discount_by_id")
const getBookingDetailById = require("../services/get_detail_booking_by_id")
const getBookingById = require("../services/get_booking_by_id")
const getReviewById = require("../services/get_review_by_id")
const getFinalByBookingId = require("../services/get_final_by_booking_id")
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

//controller nơi nhận dữ liệu từ request(req) => vào Service xử lý dữ liệu 
//=> gọi repository để truy cập vào database  thông qua models
class ManagerController {
    //thống kê
    async statistical(req, res) {
        var month = new Date().getMonth() + 1;
        let number_room = await numberOfRoomByHotel(req.hotel);
        let number_of_booking = await numberOfBookingByHotel(req.hotel);
        let number_of_event = await numberOfEventByHotel(req.hotel);
        let number_of_user = await numberOfUser();
        let best_type_room = await bestTypeRoom(req.hotel);
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "statistical/management",
            number_room: number_room,
            number_of_booking: number_of_booking,
            number_of_event: number_of_event,
            number_of_user: number_of_user,
            best_type_room: best_type_room,
            month: month,
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }

    //quản lý khách sạn
    async hotel(req, res) {
        let hotel = await getHotelById(req.hotel._id)
        let cityDetail = await getCityByID(hotel.city)
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "hotel/management",
            hotel: hotel,
            city: cityDetail.name,
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }

    async editHotel(req, res) {
        let hotel = await getHotelById(req.hotel._id);
        let cities = await getAllCity();
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "hotel/edit",
            cities: cities,
            ...defaultManagerNav(),
            ...defaultData(req),
            hotel: hotel,
        })
    }

    async editHotelHandler(req, res) {
        let originHotel = await getHotelById(req.hotel._id)
        let file = req.file;
        originHotel.name = req.body.tenkhachsan;
        originHotel.address = req.body.diachi;
        originHotel.description = req.body.mieuta;
        originHotel.star = req.body.sosao;
        originHotel.city = req.body.city;
        
        if (file) {
            const imageData = await uploadImageFromLocal(file.path, 'hotel', file.filename);
            originHotel.image = imageData.img_url;
        }
        await updateHotel(originHotel);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã sửa thông tin khách sạn thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect(`/manager/${req.hotel._id.toString()}/hotel/`);
    }

    //quản lý phòng
    async room(req, res) {
        let rooms = await getAllRooms({
            hotel: req.hotel,
        });
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "room/management",
            rooms: rooms,
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }


    async roomDetail(req, res) {
        let room = await getRoomById(req.params.id, true);
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "room/detail",
            room: room,
            ...defaultManagerNav(),
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
            page: "manager/index",
            roomPage: "room/add",
            typeRooms: typeRooms,
            serviceRooms: serviceRooms,
            selectionRooms: selectionRooms,
            ...defaultManagerNav(),
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
        res.redirect("/manager/" + req.hotel._id + "/room/");

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
            page: "manager/index",
            roomPage: "room/edit",
            room: room,
            typeRooms: typeRooms,
            serviceRooms: serviceRooms,
            selectionRooms: selectionRooms,
            status: status,
            ...defaultManagerNav(),
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
        res.redirect("/manager/" + req.hotel._id + "/room/");

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
        res.redirect("/manager/" + req.hotel._id + "/room/");
    }


    //quản lý sự kiện
    async event(req, res) {
        let events = await getAllEvents({
            hotel: req.hotel,
        });
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "event/management",
            events: events,
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }

    async addEvent(req, res) {
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "event/add",
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }

    async addEventHandler(req, res) {
        let event = {
            hotel: req.hotel,
            name: req.body.tensukien,
            discount_percent: req.body.phantram,
            date_start: req.body.ngaydau,
            date_end: req.body.ngayket,
        }
        await createEvent(event);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã thêm sự kiện mới thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/manager/" + req.hotel._id + "/event/");
    }

    async editEvent(req, res) {
        let event = await getEventById(req.params.id);
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "event/edit",
            event: event,
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }

    async editEventHandler(req, res) {
        let originEvent = await getEventById(req.params.id);

        originEvent.hotel = req.hotel;
        originEvent.name = req.body.tensukien;
        originEvent.discount_percent = req.body.phantram;
        originEvent.date_start = req.body.ngaydau;
        originEvent.date_end = req.body.ngayket;

        await updateEvent(originEvent);

        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã sửa thông tin sự kiện thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/manager/" + req.hotel._id + "/event/");

    }

    async deleteEventHandler(req, res) {
        try {
            let originEvent = await getEventById(req.params.id);
            await deleteEvent(originEvent._id.toString())
        } catch (e) {
            console.log(e);
        }

        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã xóa thông tin event thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/manager/" + req.hotel._id + "/event/");
    }

    //quản lý giảm giá
    async discount(req, res) {
        let discounts = await getAllDiscounts(req.hotel);
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "discount/management",
            discounts: discounts,
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }

    async addDiscount(req, res) {
        let type_rooms = await getAllTypeRooms(req.hotel);
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "discount/add",
            type_rooms: type_rooms,
            ...defaultManagerNav(),
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
        res.redirect("/manager/" + req.hotel._id + "/discount/");
    }

    async editDiscount(req, res) {
        let discount = await getDiscountById(req.params.id);
        let type_rooms = await getAllTypeRooms(req.hotel);
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "discount/edit",
            discount: discount,
            type_rooms: type_rooms,
            ...defaultManagerNav(),
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
        res.redirect("/manager/" + req.hotel._id + "/discount/");

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
        res.redirect("/manager/" + req.hotel._id + "/discount/");
    }


    //quản lý nhân viên
    async employee(req, res) {
        let employees = await getAllUsersByHotel(req.hotel, RoleEnum.Employee);
        let subs = await getAllUsersByHotel(req.hotel, RoleEnum.Sub);
        let users = [
            ...employees,
            ...subs,
        ]
        users = Array.from(new Map(users.map(user => [user._id.toString(), user])).values());
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "user/employee/management",
            users: users,
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }

    async addEmployee(req, res) {
        const roles = await getAllRole()
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "user/employee/add",
            roles: roles,
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }

    async addEmployeeHandler(req, res) {
        let user = {
            name: req.body.tennhanvien,
            phone: req.body.sodienthoai,
            email: req.body.email,
            password: req.body.matkhau
        }
        let employee = await createUser(user, req.body.role);
     
        await createEmployee(req.hotel, employee);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã thêm nhân viên mới thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/manager/" + req.hotel._id + "/user/employee");

    }

    async editEmployee(req, res) {
        let currentUser = await getUserById(req.params.id);
        const roles = await getAllRole()
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "user/employee/edit",
            currentUser: currentUser,
            roles: roles,
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }

    async editEmployeeHandler(req, res) {
        let originUser = await getUserById(req.params.id);

        originUser.name = req.body.tennhanvien;
        originUser.phone = req.body.sodienthoai;
        originUser.email = req.body.email;

        await updateUser(originUser);

        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã sửa thông tin nhân viên thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/manager/" + req.hotel._id + "/user/employee/");

    }

    async deleteEmployeeHandler(req, res) {
        try {
            let originUser = await getUserById(req.params.id);
            await deleteUser(originUser._id.toString())
            await deleteEmployee(originUser._id.toString())
        } catch (e) {
            console.log(e);
        }

        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã xóa thông tin nhân viên thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/manager/" + req.hotel._id + "/user/employee/");
    }


    //quản lý khách hàng
    async customer(req, res) {
        let users = await getAllUsers();
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "user/customer/management",
            users: users,
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }

    async addCustomer(req, res) {
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "user/customer/add",
            ...defaultManagerNav(),
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
        res.redirect("/manager/" + req.hotel._id + "/user/customer");

    }

    async editCustomer(req, res) {
        let currentUser = await getUserById(req.params.id);
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "user/customer/edit",
            currentUser: currentUser,
            ...defaultManagerNav(),
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
        res.redirect("/manager/" + req.hotel._id + "/user/customer/");

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
        res.redirect("/manager/" + req.hotel._id + "/user/customer/");
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
            page: "manager/index",
            roomPage: "booking/management",
            bookings: bookings,
            details: details,
            getStatus: getStatus,
            getRoom: getRoom,
            ...defaultManagerNav(),
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
        let details = await getAllDetailBookingByIdBookings({
            booking: booking._id,
        }); 
        let final = await getFinalByBookingId({
            booking: booking._id,
        });
        let cookies = new CookieProvider(req, res);
        let userString = cookies.getCookie(constants.user_info);
        console.log("ten nhan vien:",userString )
        let service_hotels = await getAllServiceHotel({ hotel: req.hotel });
        let service_quantitys = await getAllServiceQuantity({ detail_booking: details });
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
            page: "manager/index",
            roomPage: "booking/status_booking",
            id: req.params.id,
            booking: booking,
            details: details, // Truyền mảng details vào view
            service_quantitys: service_quantitys,
            service_hotels: service_hotels,
            getStatus: getStatus,
            ...defaultManagerNav(),
            ...defaultData(req)
        });
    }
    

    async editStatusBookingHandler(req, res) {
        let booking = await getBookingById(req.params.id, false);
        let detailBooking = await getBookingDetailById(req.params.id)
        let { final_price, process_user, ngaytraphong } = req.body
        let user = await getUserById(process_user)
        console.log(final_price, "....", process_user, "....", ngaytraphong)
        if (req.body.status != "cancel") {
            booking.status = req.body.status;
            detailBooking.status = req.body.status;
            await updateBooking(booking);
            await updateBookingDetail(detailBooking)
            if (req.body.status === "Đã trả phòng") {
                await createFinal({
                    final_price: final_price,
                    NowDate: ngaytraphong,
                    booking: booking,
                    nhanvien: user,
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
        res.redirect("/manager/" + req.hotel._id + "/booking");
    }

    async serviceHotelBooking(req, res) {
        let booking = await getBookingById(req.params.id, false);
        let service_hotels = await getAllServiceHotel({ hotel: req.hotel, })
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "booking/service_hotel",
            booking: booking,
            service_hotels: service_hotels,
            ...defaultManagerNav(),
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
            res.redirect("/manager/" + req.hotel._id + "/booking/status_booking/" + booking._id);
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
            page: "manager/index",
            roomPage: "booking/add",
            rooms: rooms,
            booking: booking,
            userID: userID,
            selections: selections,
            ...defaultManagerNav(),
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
        return res.redirect("/manager/" + req.hotel._id + "/booking")
    }
    //quản lý co so vat chat
    async service(req, res) {
        let services = await getAllService({
            hotel: req.hotel,
        });
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "cosovatchat/management",
            services: services,
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }

    async addService(req, res) {
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "cosovatchat/add",
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }

    async addServiceHandler(req, res) {
        let service = {
            hotel: req.hotel,
            name: req.body.tendichvu,
            icon: req.body.icon,
        }
        await createService(service);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã thêm cơ sở vật chất mới thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/manager/" + req.hotel._id + "/service");
    }

    async editService(req, res) {
        let service = await getServiceById(req.params.id);
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "cosovatchat/edit",
            service: service,
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }
    async editServiceHandler(req, res) {
        let originService = await getServiceById(req.params.id);
        originService.hotel = req.hotel;
        originService.name = req.body.tendichvu;
        originService.icon = req.body.icon;
        await updateService(originService);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã sửa thông tin cơ sở vật chất thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/manager/" + req.hotel._id + "/service");
    }

    async deleteServiceHandler(req, res) {
        try {
            let originService = await getServiceById(req.params.id);
            await deleteService(originService._id.toString())
        } catch (e) {
            console.log(e);
        }

        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã xóa thông tin cơ sở vật chất thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/manager/" + req.hotel._id + "/service");
    }

    //quản lý lựa chọn
    async selection(req, res) {
        let selections = await getAllSelection({
            hotel: req.hotel,
        });
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "selection/management",
            selections: selections,
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }

    async addSelection(req, res) {
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "selection/add",
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }

    async addSelectionHandler(req, res) {
        let selection = {
            hotel: req.hotel,
            name: req.body.tendichvu,
            icon: req.body.icon,
        }
        await createSelection(selection);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã thêm lựa chọn mới thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/manager/" + req.hotel._id + "/selection");
    }

    async editSelection(req, res) {
        let selection = await getSelectionById(req.params.id);
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "selection/edit",
            selection: selection,
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }
    async editSelectionHandler(req, res) {
        let originSelection = await getSelectionById(req.params.id);
        originSelection.hotel = req.hotel;
        originSelection.name = req.body.tendichvu;
        originSelection.icon = req.body.icon;
        await updateSelection(originSelection);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã sửa thông tin lựa chọn thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/manager/" + req.hotel._id + "/selection");
    }

    async deleteSelectionHandler(req, res) {
        try {
            let originSelection = await getSelectionById(req.params.id);
            await deleteSelection(originSelection._id.toString())
        } catch (e) {
            console.log(e);
        }

        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã xóa thông tin lựa chọn thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/manager/" + req.hotel._id + "/selection");
    }

    //quản lý loại phòng
    async TypeRoom(req, res) {
        let type_rooms = await getAllTypeRoom(req.hotel);
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "type_room/management",
            type_rooms: type_rooms,
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }

    async addTypeRoom(req, res) {
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "type_room/add",
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }

    async addTypeRoomHandler(req, res) {
        let typeRoom = {
            hotel: req.hotel,
            name: req.body.loaiphong,
            number_guest: req.body.soluongkhach,
        }
        await createTypeRoom(typeRoom);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã thêm loại phòng mới thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/manager/" + req.hotel._id + "/type_room");
    }

    async editTypeRoom(req, res) {
        let type_room = await getTypeRoomById(req.params.id);
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "type_room/edit",
            type_room: type_room,
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }
    async editTypeRoomHandler(req, res) {
        let originTypeRoom = await getTypeRoomById(req.params.id);
        originTypeRoom.hotel = req.hotel;
        originTypeRoom.name = req.body.loaiphong;
        originTypeRoom.number_guest = req.body.soluongkhach;
        await updateTypeRoom(originTypeRoom);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã sửa thông tin loại phòng thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/manager/" + req.hotel._id + "/type_room");
    }

    async deleteTypeRoomHandler(req, res) {
        try {
            let originTypeRoom = await getTypeRoomById(req.params.id);
            await deleteTypeRoom(originTypeRoom._id.toString())
        } catch (e) {
            console.log(e);
        }

        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã xóa thông tin loại phòng thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/manager/" + req.hotel._id + "/type_room");
    }


    // quan ly dich vu
    async ServiceHotel(req, res) {
        let service_hotels = await getAllServiceHotel({
            hotel: req.hotel,
        });
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "service_hotel/management",
            service_hotels: service_hotels,
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }

    async addServiceHotel(req, res) {
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "service_hotel/add",
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }

    async addServiceHotelHandler(req, res) {
        let service_hotel = {
            hotel: req.hotel,
            name: req.body.tendichvu,
            description: req.body.description,
            price: req.body.gia,
        }
        await createServiceHotel(service_hotel);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã thêm dịch vụ mới thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/manager/" + req.hotel._id + "/service_hotel");
    }

    async editServiceHotel(req, res) {
        let service_hotel = await getServiceHotelById(req.params.id);
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "service_hotel/edit",
            service_hotel: service_hotel,
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }
    async editServiceHotelHandler(req, res) {
        let originServiceHotel = await getServiceHotelById(req.params.id);
        originServiceHotel.hotel = req.hotel;
        originServiceHotel.name = req.body.tendichvu;
        originServiceHotel.description = req.body.description;
        originServiceHotel.price = req.body.gia;

        await updateServiceHotel(originServiceHotel);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã sửa thông tin dịch vụ thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/manager/" + req.hotel._id + "/service_hotel");
    }

    async deleteServiceHotelHandler(req, res) {
        try {
            let originServiceHotel = await getServiceHotelById(req.params.id);
           
            await deleteServiceHotel(originServiceHotel._id.toString())
         
        } catch (e) {
            console.log(e);
        }

        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã xóa thông tin dịch vụ thành công!", constantMesages.successCustom)),
            1
        );
        res.redirect("/manager/" + req.hotel._id + "/service_hotel");
    }



    //Đánh giá
    async review(req, res) {
        let reviews = await getAllReviews(req.hotel);
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "review/management",
            reviews: reviews,
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }

    async reviewDetail(req, res) {
        let review = await getReviewById(req.params.id);
        res.render("index-manager", {
            page: "manager/index",
            roomPage: "review/detail",
            review: review,
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }
}
module.exports = { ManagerController }