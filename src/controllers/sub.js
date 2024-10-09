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
const getAllBookingDetails = require("../services/get_all_detai_booking")
const getAllUsersByHotel = require("../services/get_all_user_by_hotel")
const getAllUsers = require("../services/get_all_user")
const getAllReviews = require("../services/get_all_review")
const getAllTypeRooms = require("../services/get_all_type_of_rooms")
const getAllSelection = require("../services/get_all_selection")
const getAllService = require("../services/get_all_service")
const getTypeRoomById = require("../services/get_type_room_by_id")
const getServiceById = require("../services/get_service_by_id")
const getServiceHotelById = require("../services/get_service_hotel_by_id")
const getRoomById = require("../services/get_room_by_id")
const getDiscountById = require("../services/get_discount_by_id")
const getDetailBookingById = require("../services/get_detail_booking_by_id")
const getBookingById = require("../services/get_booking_by_id")
const getReviewById = require("../services/get_review_by_id")
const getEventById = require("../services/get_event_by_id")
const getUserById = require("../services/get_user_by_id")
const getSelectionById = require("../services/get_selection_by_id")
const getImageByFilter = require("../services/get_image_by_filter")
const getAllDiscounts = require("../services/get_all_discount")
const createRoom = require("../services/create_room")
const createUser = require("../services/create_user")
const createDiscount = require("../services/create_discount")
const createImage = require("../services/create_image")
const createServiceRoom = require("../services/create_service_room")
const createSelectionRoom = require("../services/create_selection_room")
const updateRoom = require("../services/update_room");
const updateUser = require("../services/update_user");
const updateEvent = require("../services/update_event");
const updateDiscount = require("../services/update_discount");
const updateBooking = require("../services/update_booking");
const updateBookingDetail = require("../services/update_detail_booking")
const deleteServiceRoomByFilter = require("../services/delete_service_room_by_filter");
const deleteSelectionRoomByFilter = require("../services/delete_selection_room_by_filter");
const deleteImageByFilter = require("../services/delete_image_by_filter");
const deleteRoom = require("../services/delete_room");
const deleteDiscount = require("../services/delete_discount");
const deleteUser = require("../services/delete_user");
const deleteBooking = require("../services/delete_booking");
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
        let users = await getAllUsers();
        res.render("index-manager", {
            page: "sub/index",
            roomPage: "customer/management",
            users: users,
            ...defaultSubNav(),
            ...defaultData(req)
        })
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

    async editBookingStatus(req, res) {
        res.render("index-manager", {
            page: "sub/index",
            roomPage: "booking/status_booking",
            id: req.params.id,
            ...defaultSubNav(),
            ...defaultData(req)
        })
    }

    async editStatusBookingHandler(req, res) {
        let booking = await getBookingById(req.params.id, false);
        let detailBooking = await getDetailBookingById(booking._id)
        console.log("Detail booking: ", detailBooking);
        if (req.body.status != "cancel") {
            booking.status = req.body.status;
            detailBooking.status = req.body.status;
            await updateBooking(booking);
            await updateBookingDetail(detailBooking)
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


}
module.exports = { SubController }