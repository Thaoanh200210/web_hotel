const constants = require("../constants/index");
const { CookieProvider } = require("../helper/cookies");
const { HotelRepository} = require("../repositories/index");

const constantMesages = require("../constants/message"); 
const { RoleEnum } = require("../models/enum/role");
const message = require("../helper/message")
const createUser  = require("../services/create_user");
const loginUser = require("../services/login");
const updateUser = require("../services/update_user");
const getEmployeeByUser = require("../services/get_employee_by_user");

class Middleware {
    
    async message(req, res, next) {
        let cookies = new CookieProvider(req, res);
        let messageString = cookies.getCookie(constants.has_message);
        if (messageString) {
            let data = JSON.parse(messageString);
            req.messageResponse = data;
            cookies.clearCookie(constants.has_message);
        } else {
            req.messageResponse  = undefined;
        }
        const hotelRepo = new HotelRepository();
        if(req.params.hotelId){
            let hotel = await hotelRepo.selectById(req.params.hotelId);
            req.hotel = hotel;
        }
        let hotels = await hotelRepo.select({isActive: true});
        req.hotelDatas = hotels;
        return await next();
    }

    async getHotel(req, res, next){
        const hotelRepo = new HotelRepository();
        if(req.params.hotelId){
            let hotel = await hotelRepo.selectById(req.params.hotelId);
            req.hotel = hotel;
        }
        return await next();
    }

    async registration(req, res, next){
        let cookies = new CookieProvider(req, res);
        if(req.body.ten && req.body.email && req.body.sodienthoai && req.body.matkhau){
            let user = {
                name: req.body.ten,
                phone: req.body.sodienthoai,
                email: req.body.email,
                password: req.body.matkhau
            }
            await createUser(user);
            
            cookies.setCookie(
                constants.has_message,
                JSON.stringify(message("Bạn đã đăng ký tài khoản thành công!",constantMesages.successCustom)),
                1
            );
            
            return res.redirect(req.originalUrl);
        }
        next()
    }

    async login(req, res, next){
        if(req.body.email && req.body.matkhau){
            
            let user = await loginUser({
                email: req.body.email,
                password: req.body.matkhau,
            });
            if(user!=null){
                let cookies = new CookieProvider(req, res);
                cookies.setCookie(
                    constants.has_message,
                    JSON.stringify(message("Bạn đã đăng nhập tài khoản thành công!",constantMesages.successCustom)),
                    1
                );
                cookies.setCookie(
                    //giữ thông tin người dùng đăng nhập 
                    constants.user_info,
                    JSON.stringify(user),
                    10000
                )
                if(user.role.name == RoleEnum.Customer){
                }else if(user.role.name == RoleEnum.Employee){
                    let employee = await getEmployeeByUser(user);
                    return res.redirect("/manager/"+ employee.hotel._id.toString() + "/room");
                }else if(user.role.name == RoleEnum.Admin){
                    return res.redirect("/administrator/hotel");
                }else if(user.role.name == RoleEnum.Mod){
                    console.log("Hello");
                    return res.redirect("/mod/city");
                }
                
            }else{
                let cookies = new CookieProvider(req, res);
                cookies.setCookie(
                    constants.has_message,
                    JSON.stringify(message("Bạn đã đăng nhập thất bại!",constantMesages.errorCustom)),
                    1
                );
            }
            return res.redirect(req.originalUrl);
        }
        next()
    }

    //lấy thông tin ng dùng
    async authenticate(req, res, next){
        let cookies = new CookieProvider(req, res);
        let userString = cookies.getCookie(constants.user_info);
        if(userString ){
            req.user = JSON.parse(userString);
        }
        await next();
    }

    async passwordChange(req, res, next){
        let cookies = new CookieProvider(req, res);
        
        if(req.body.matkhaucu){
            let userString = cookies.getCookie(constants.user_info);
            if(userString ){
                let currentUser = JSON.parse(userString);
                let user = await loginUser({
                    email: currentUser.email,
                    password: req.body.matkhaucu,
                });
                if(user){
                    user.password = req.body.matkhaumoi;
                    await updateUser(user)
                    cookies.setCookie(
                        constants.has_message,
                        JSON.stringify(message("Bạn đã đổi mật khẩu thành công",constantMesages.successCustom)),
                        1
                    );
                } else {
                    cookies.setCookie(
                        constants.has_message,
                        JSON.stringify(message("Mật khẩu cũ không chính xác",constantMesages.errorCustom)),
                        1
                    );
                }
                return res.redirect(req.originalUrl);
            }
            next();
        }else{
            next();
        }
    }

};

module.exports = { Middleware };
