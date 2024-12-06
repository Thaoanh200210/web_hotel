const defaultData = require("../helper/default-data")
const message = require("../helper/message")
const path = require("path");
const {CookieProvider} = require("../helper/cookies")
const uploadImageFromLocal = require("../services/upload_image_from_local")
const getAllCity = require("../services/get_all_city")
const getAllHotels = require("../services/get_all_hotel")
const getAllRooms = require("../services/get_all_rooms")
const createUser  = require("../services/create_user")
const createEmployee = require("../services/create_employee");
const createHotel = require('../services/create_hotel')
const constants = require("../constants")
const constantMesages = require("../constants/message"); 
const { RoleEnum } = require("../models/enum/role");

//controller nơi nhận dữ liệu từ request(req) => vào Service xử lý dữ liệu 
//=> gọi repository để truy cập vào database  thông qua models


class GuestController{
    // find available hotels and rooms
    async getRoomPriceOfHotel(req, res) {
        try {
            const hotelName = req.body.queryResult.parameters.hotelName || "Thao Anh Hotel";
    
            const hotel = await findHotelByName(hotelName);
            
            if (!hotel) {
                return res.json({
                    fulfillmentText: `Không tìm thấy khách sạn ${hotelName}.`
                });
            }
    
            const rooms = await getAllRooms({
                hotel: hotel._id,
                status: "Đang hoạt động"
            });
    
            if (rooms.length === 0) {
                return res.json({
                    fulfillmentText: `Khách sạn ${hotelName} không có phòng nào đang hoạt động.`
                });
            }

            const roomDescriptions = rooms.map(room => `Phòng ${room.name} có giá ${room.original_price} VNĐ`).join(', ');

            return res.json({
                fulfillmentText: `Khách sạn ${hotelName} có các phòng: ${roomDescriptions}.`
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                fulfillmentText: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn.'
            });
        }
    }

    async addHotel(req, res) {
        let citys = await getAllCity();
        res.render("index-manager",{
            page: "guest/index",
            roomPage: "hotel/add",
            citys: citys,
            ...defaultData(req)
        })
    }

    async addHotelHandler(req, res) {
        let file = req.file;
        let owner = {
            name: req.body.chusohuu,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.matkhau,
            gioitinh: req.body.gioitinh,
            address: req.body.address,
            cmnd: req.body.cmnd,

        }
        let user = await createUser(owner,RoleEnum.Employee);
        console.log("Create user successfully:::", user);
        let hotel = {
            owner: user,
            name: req.body.tenkhachsan,
            address: req.body.diachi,
            sodienthoai: req.body.sodienthoai,
            description: req.body.mieuta,
            timecheckin: req.body.timecheckin,
            timecheckout: req.body.timecheckout,
            chinhsachdatphong: req.body.chinhsachdatphong,
            chinhsachtreem: req.body.chinhsachtreem,
            dotuoigioihan: req.body.dotuoigioihan,
            vatnuoi: req.body.vatnuoi,
            star: req.body.sosao,
            city: req.body.city,
            slogan: req.body.slogan,
            image: ""
        }
        if (file) {
            const imageData = await uploadImageFromLocal(file.path, 'hotel', file.filename);
            hotel.image = imageData.img_url;
        }
        const hotelCreated = await createHotel(hotel);
        await createEmployee(hotelCreated._id, user._id);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
          constants.has_message,
          JSON.stringify(message("Bạn đã đăng ký khách sạn thành công, thông báo xét duyệt chúng tôi sẽ gửi qua mail cho bạn xin vui lòng chờ!", constantMesages.successCustom)),
          1
        );
    
        return res.redirect('/');
    }
}
module.exports = { GuestController }