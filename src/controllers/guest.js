const defaultData = require("../helper/default-data")
const message = require("../helper/message")
const path = require("path");
const {CookieProvider} = require("../helper/cookies")
const uploadImageFromLocal = require("../services/upload_image_from_local")
const getAllCity = require("../services/get_all_city")
const createUser  = require("../services/create_user")
const createEmployee = require("../services/create_employee");
const createHotel = require('../services/create_hotel')
const constants = require("../constants")
const constantMesages = require("../constants/message"); 
const { RoleEnum } = require("../models/enum/role");

//controller nơi nhận dữ liệu từ request(req) => vào Service xử lý dữ liệu 
//=> gọi repository để truy cập vào database  thông qua models


class GuestController{
    async addHotel(req, res) {
        let citys = await getAllCity();
        res.render("index-guest",{
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
            phone: req.body.sodienthoai,
            email: req.body.email,
            password: req.body.matkhau,
        }
        let user = await createUser(owner,RoleEnum.Employee);
        console.log("Create user successfully:::", user);
        let hotel = {
            owner: user,
            name: req.body.tenkhachsan,
            address: req.body.diachi,
            description: req.body.mieuta,
            star: req.body.sosao,
            city: req.body.city,
            slogan: req.body.slogan,
            image: ""
        }
        if (file) {
            const imageData = await uploadImageFromLocal(file.path, 'hotel', file.filename);
            console.log("Uploading image...");
            hotel.image = imageData.img_url;
        }
        const hotelCreated = await createHotel(hotel);
        const result = await createEmployee(hotelCreated._id, user._id);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã thêm khách sạn mới thành công, sau khi Manager duyet khach san cua ban se di vao hoat dong!",constantMesages.successCustom)),
            1
        );
        if (result) {
            return "Create hotel successfully, please wait for admin acceptance...";
        }
    }
}
module.exports = { GuestController }