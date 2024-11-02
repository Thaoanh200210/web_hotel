const defaultData = require("../helper/default-data")
const defaultAdminNav = require("../helper/default-admin-nav")
const message = require("../helper/message")
const constants = require("../constants")
const constantMesages = require("../constants/message"); 
const writeFile = require("../helper/file")
const fs = require("fs");
const path = require("path");
const {CookieProvider} = require("../helper/cookies")
const { RoleEnum } = require("../models/enum/role");
const getAllHotel = require("../services/get_all_hotel")
const getAllUsers = require("../services/get_all_user")
const getAllCity = require("../services/get_all_city")
const getAllService = require("../services/get_all_service")
const getAllSelection = require("../services/get_all_selection")
const getAllTypeRoom = require("../services/get_all_type_of_rooms")
const getAllBooking = require('../services/get_all_booking')
const getHotelById = require("../services/get_hotel_by_id")
const getTypeRoomById = require("../services/get_type_room_by_id")
const getServiceById = require("../services/get_service_by_id")
const getSelectionById = require("../services/get_selection_by_id")
const getAllRole = require("../services/get_all_role")
const getUserById  = require("../services/get_user_by_id")
const getCityById  = require("../services/get_city_by_id")
const createHotel = require("../services/create_hotel")
const createCity = require("../services/create_city")
const createUser = require("../services/create_user")
const createTypeRoom = require("../services/create_type_room")
const createService = require("../services/create_service")
const createSelection = require("../services/create_selection")
const createEmployee = require("../services/create_employee")
const updateCity = require("../services/update_city")
const updateSelection = require("../services/update_selection")
const updateService = require("../services/update_service")
const updateTypeRoom = require("../services/update_type_room")
const updateUser = require("../services/update_user");
const updateHotel = require("../services/update_hotel");
const deleteCity = require("../services/delete_city")
const deleteHotel = require("../services/delete_hotel")
const deleteUser = require("../services/delete_user")
const deleteSelection = require("../services/delete_selection")
const deleteService = require("../services/delete_service")
const deleteTypeRoom = require("../services/delete_type_room")
const numberOfHotels = require("../services/number_of_hotel")
const numberOfCitys = require("../services/number_of_city")
const numberOfRooms = require("../services/number_of_room")
const numberOfSelections = require("../services/number_of_selection")
const numberOfTypeOfRooms = require("../services/number_of_type_of_room")
const numberOfServices = require("../services/number_of_service")
const uploadImageFromLocal = require("../services/upload_image_from_local")

class AdminController{
    async statistical(req, res) {
        let type = req.query.type;
        let month = req.query.month;
        let quarter = req.query.quarter;
        let year = req.query.year;
    
        let number_of_hotel = await numberOfHotels();
        let number_of_service = await numberOfServices();
        let number_of_type_room = await numberOfTypeOfRooms();
        let number_of_selection = await numberOfSelections();
        let number_of_city = await numberOfCitys();
    
        let hotels = await getAllHotel(true);
        let hotel_bookings = {};
        let hotel_names = {};
        let statistic_result = {};
    
        for (let hotel of hotels) {
            let bookings = await getAllBooking(hotel);
            hotel_bookings[hotel._id] = bookings;
            hotel_names[hotel._id] = hotel.name;
    
            // Filter bookings based on the selected time period
            let filteredBookings = [];
            if (type === 'month' && month) {
                let [yearInput, monthInput] = month.split('-').map(Number);
                filteredBookings = bookings.filter(booking => {
                    let checkIn = new Date(booking.check_in);
                    return checkIn.getFullYear() === yearInput && (checkIn.getMonth() + 1) === monthInput;
                });
            } else if (type === 'quarter' && quarter) {
                let [yearInput, quarterInput] = quarter.split('-').map(Number);
                let startMonth = (quarterInput - 1) * 3;
                let endMonth = startMonth + 2;
                filteredBookings = bookings.filter(booking => {
                    let checkIn = new Date(booking.check_in);
                    return checkIn.getFullYear() === yearInput &&
                           checkIn.getMonth() >= startMonth && checkIn.getMonth() <= endMonth;
                });
            } else if (type === 'year' && year) {
                let yearInput = parseInt(year);
                filteredBookings = bookings.filter(booking => {
                    let checkIn = new Date(booking.check_in);
                    return checkIn.getFullYear() === yearInput;
                });
            } else {
                filteredBookings = bookings; 
            }
    
            statistic_result[hotel._id] = {
                totalBookings: filteredBookings.length,
            };
        }
        console.log(statistic_result);
    
        res.render("index-manager", {
            page: "admin/index",
            roomPage: "statistical/management",
            number_of_hotel: number_of_hotel,
            number_of_service: number_of_service,
            number_of_type_room: number_of_type_room,
            number_of_selection: number_of_selection,
            number_of_city:number_of_city,
            statistic_result: statistic_result,
            hotel_names: hotel_names,
            type: type,
            month: month, 
            year: year,
            quarter: quarter,
            ...defaultAdminNav(),
            ...defaultData(req),
        });
    }
    

    async city(req, res) {
        let citys = await getAllCity();
        res.render("index-manager",{
            page: "admin/index",
            roomPage: "city/management",
            citys: citys,
            ...defaultAdminNav(),
            ...defaultData(req)
        })
    }

    async addCity(req, res) {
        res.render("index-manager",{
            page: "admin/index",
            roomPage: "city/add",
            ...defaultAdminNav(),
            ...defaultData(req)
        })
    }

    // async addCityHandler(req,res){
    //     console.log(req.body)
    //     let city = {
    //         name : req.body.cityName,
    //         image: req.body.imagePath
    //     }
    //     console.log(city);
    //     await createCity(city);
    //     let cookies = new CookieProvider(req, res);
    //     cookies.setCookie(
    //         constants.has_message,
    //         JSON.stringify(message("Bạn đã thêm thành phố mới thành công!",constantMesages.successCustom)),
    //         1
    //     );
    //     res.redirect("/administrator/city/");
    // }

    async editCity(req, res) {
        let city = await getCityById(req.params.id);
        res.render("index-manager",{
            page: "admin/index",
            roomPage: "city/edit",
            ...defaultAdminNav(),
            ...defaultData(req),
            city: city,
        })
    }

    // adđ
    async addCityHandler(req, res, next) {
        try {
          const { file, body: { folderName, cityName } } = req;
      
          if (!file) {
            return res.status(400).send('No file uploaded.');
          }
      
          const imageData = await uploadImageFromLocal(
            file.path,
            folderName,
            file.filename
          );
      
          const city = {
            name: cityName,
            image: imageData.img_url
          };
      
          await createCity(city);
      
          let cookies = new CookieProvider(req, res);
          cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã thêm thành phố mới thành công!", constantMesages.successCustom)),
            1
          );
      
          return res.redirect('/administrator/city');
        } catch (error) {
          console.error(error);
          return res.status(500).send('Error adding city.');
        }
      }

      async deleteCityHandler(req, res) {
        try {
            let originCity = await getCityById(req.params.id);
            await deleteCity(originCity._id.toString())
        } catch(e){
            console.log(e);
        }
        
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã xóa thông tin địa điểm thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/administrator/city/");
    }

    //edit city
    async editCityHandler(req,res, next){
        try {
            console.log("Enter::", req.params.id)
            let originCity = await getCityById(req.params.id);
    
            console.log(req.body);
            const cityName = req.body.cityName;
            const file = req.file;

            if (!cityName) {
                return res.status(400).send('City name is required');
            }
            if (file) {
                const imageData = await uploadImageFromLocal(file.path, 'cities', file.filename);
                originCity.name = cityName;
                originCity.image = imageData.img_url;
                await updateCity(originCity);
                let cookies = new CookieProvider(req, res);
                cookies.setCookie(
                    constants.has_message,
                    JSON.stringify(message("Bạn đã sửa thông tin thành phố thành công!",constantMesages.successCustom)),
                    1
                );
                res.redirect("/administrator/city/");
            }
        } catch (e) {
            console.log("Error when editing city:: ", e.message)
        }
    }

    //hotel
    async hotel(req,res) {
        let hotels = await getAllHotel();
        let citys = [];
        for (let hotel of hotels) {
            if (hotel.city) {
                console.log("id city:", hotel.city)
                let cityData = await getCityById( hotel.city );
                if (cityData && cityData.name) {
                    citys[hotel._id] = cityData.name; 
                }
            }
        }
        console.log("city:",citys);


        res.render("index-manager",{
            page: "admin/index",
            roomPage: "hotel/management",
            hotels: hotels,
            citys:citys,
            ...defaultAdminNav(),
            ...defaultData(req)
        })
    }
    
    async addHotel(req, res) {
        let citys = await getAllCity();
        res.render("index-manager",{
            page: "admin/index",
            roomPage: "hotel/add",
            citys: citys,
            ...defaultAdminNav(),
            ...defaultData(req)
        })
    }
    async hotelDetail(req, res) {
        let hotel = await getHotelById(req.params.id);
        res.render("index-manager", {
            page: "admin/index",
            roomPage: "hotel/detail",
            hotel: hotel,
            ...defaultAdminNav(),
            ...defaultData(req)
        })
    }
    async addHotelHandler(req, res) {
        let owner = {
            name: req.body.chusohuu,
            phone: req.body.sodienthoai,
            email: req.body.email,
            password: req.body.matkhau,
        }
        let user = await createUser(owner,RoleEnum.Employee);
        let hotel = {
            owner: user,
            name: req.body.tenkhachsan,
            address: req.body.diachi,
            description: req.body.mieuta,
            star: req.body.sosao,
            city_id: req.body.city,
        }
        await createHotel(hotel);
        await createEmployee(hotel,owner);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã thêm khách sạn mới thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/administrator/hotel/");
    }

    async editHotel(req, res) {
        let hotel = await getHotelById(req.params.id);
        res.render("index-manager",{
            page: "admin/index",
            roomPage: "hotel/edit",
            ...defaultAdminNav(),
            ...defaultData(req),
            hotel: hotel,
        })
    }

    async editHotelHandler(req, res) {
        let originHotel = await getHotelById(req.params.id);
        originHotel.name = req.body.tenkhachsan;
        originHotel.address = req.body.diachi;
        originHotel.description = req.body.mieuta;
        originHotel.star = req.body.sosao;
        originHotel.city_id = req.body.city;
        await updateHotel(originHotel);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã sửa thông tin khách sạn thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/administrator/hotel/");
    }

    async activateHotelHandler(req, res) {
        let originHotel = await getHotelById(req.params.id);
        originHotel.isActive = true;
        await updateHotel(originHotel);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã kich hoat khách sạn thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/administrator/hotel/");
    }

    async negateHotelHandler(req, res) {
        let originHotel = await getHotelById(req.params.id);
        originHotel.isActive = false;
        await updateHotel(originHotel);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã vo hieu khách sạn thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/administrator/hotel/");
    }

    async deleteHotelHandler(req, res) {
        await deleteHotel(req.params.id);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã xoa khách sạn thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/administrator/hotel/");
    }

    // //quản lý service 
    // async service(req,res){
    //     let services = await getAllService();
    //     res.render("index-manager",{
    //         page: "admin/index",
    //         roomPage: "service/management",
    //         services: services,
    //         ...defaultAdminNav(),
    //         ...defaultData(req)
    //     })
    // }

    // async addService(req, res) {
    //     res.render("index-manager",{
    //         page: "admin/index",
    //         roomPage: "service/add",
    //         ...defaultAdminNav(),
    //         ...defaultData(req)
    //     })
    // }

    // async addServiceHandler(req,res){
    //     let service = {
    //         name : req.body.tendichvu,
    //         icon: req.body.icon,
    //     }
    //     await createService(service);
    //     let cookies = new CookieProvider(req, res);
    //     cookies.setCookie(
    //         constants.has_message,
    //         JSON.stringify(message("Bạn đã thêm dịch vụ mới thành công!",constantMesages.successCustom)),
    //         1
    //     );
    //     res.redirect("/administrator/service/");
    // }

    // async editService(req, res) {
    //     let service = await getServiceById(req.params.id);
    //     res.render("index-manager",{
    //         page: "admin/index",
    //         roomPage: "service/edit",
    //         service: service,
    //         ...defaultAdminNav(),
    //         ...defaultData(req)
    //     })
    // }
    // async editServiceHandler(req,res){
    //     let originService = await getServiceById(req.params.id);

    //     originService.name = req.body.tendichvu;
    //     originService.icon = req.body.icon;
    //     await updateService(originService);
    //     let cookies = new CookieProvider(req, res);
    //     cookies.setCookie(
    //         constants.has_message,
    //         JSON.stringify(message("Bạn đã sửa thông tin dịch vụ thành công!",constantMesages.successCustom)),
    //         1
    //     );
    //     res.redirect("/administrator/service/");
    // }

    // async deleteServiceHandler(req, res) {
    //     try {
    //         let originService = await getServiceById(req.params.id);
    //         await deleteService(originService._id.toString())
    //     } catch(e){
    //         console.log(e);
    //     }
        
    //     let cookies = new CookieProvider(req, res);
    //     cookies.setCookie(
    //         constants.has_message,
    //         JSON.stringify(message("Bạn đã xóa thông tin dịch vụ thành công!",constantMesages.successCustom)),
    //         1
    //     );
    //     res.redirect("/administrator/service/");
    // }

    //quản lý lựa chọn
    async selection(req,res){
        let selections = await getAllSelection();
        res.render("index-manager",{
            page: "admin/index",
            roomPage: "selection/management",
            selections: selections,
            ...defaultAdminNav(),
            ...defaultData(req)
        })
    }

    async addSelection(req, res) {
        res.render("index-manager",{
            page: "admin/index",
            roomPage: "selection/add",
            ...defaultAdminNav(),
            ...defaultData(req)
        })
    }

    async addSelectionHandler(req,res){
        let selection = {
            name : req.body.tendichvu,
            icon: req.body.icon,
        }
        await createSelection(selection);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã thêm lựa chọn mới thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/administrator/selection/");
    }

    async editSelection(req, res) {
        let selection = await getSelectionById(req.params.id);
        res.render("index-manager",{
            page: "admin/index",
            roomPage: "selection/edit",
            selection: selection,
            ...defaultAdminNav(),
            ...defaultData(req)
        })
    }
    async editSelectionHandler(req,res){
        let originSelection = await getSelectionById(req.params.id);

        originSelection.name = req.body.tendichvu;
        originSelection.icon = req.body.icon;
        await updateSelection(originSelection);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã sửa thông tin lựa chọn thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/administrator/selection/");
    }

    async deleteSelectionHandler(req, res) {
        try {
            let originSelection = await getSelectionById(req.params.id);
            await deleteSelection(originSelection._id.toString())
        } catch(e){
            console.log(e);
        }
        
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã xóa thông tin lựa chọn thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/administrator/selection/");
    }

    // //quản lý loại phòng
    // async TypeRoom(req,res){
    //     let type_rooms = await getAllTypeRoom();
    //     res.render("index-manager",{
    //         page: "admin/index",
    //         roomPage: "type_room/management",
    //         type_rooms: type_rooms,
    //         ...defaultAdminNav(),
    //         ...defaultData(req)
    //     })
    // }

    // async addTypeRoom(req, res) {
    //     res.render("index-manager",{
    //         page: "admin/index",
    //         roomPage: "type_room/add",
    //         ...defaultAdminNav(),
    //         ...defaultData(req)
    //     })
    // }

    // async addTypeRoomHandler(req,res){
    //     let typeRoom = {
    //         name : req.body.loaiphong,
    //         number_guest: req.body.soluongkhach,
    //     }
    //     await createTypeRoom(typeRoom);
    //     let cookies = new CookieProvider(req, res);
    //     cookies.setCookie(
    //         constants.has_message,
    //         JSON.stringify(message("Bạn đã thêm loại phòng mới thành công!",constantMesages.successCustom)),
    //         1
    //     );
    //     res.redirect("/administrator/type_room/");
    // }

    // async editTypeRoom(req, res) {
    //     let type_room = await getTypeRoomById(req.params.id);
    //     res.render("index-manager",{
    //         page: "admin/index",
    //         roomPage: "type_room/edit",
    //         type_room: type_room,
    //         ...defaultAdminNav(),
    //         ...defaultData(req)
    //     })
    // }
    // async editTypeRoomHandler(req,res){
    //     let originTypeRoom = await getTypeRoomById(req.params.id);

    //     originTypeRoom.name = req.body.loaiphong;
    //     originTypeRoom.number_guest = req.body.soluongkhach;
    //     await updateTypeRoom(originTypeRoom);
    //     let cookies = new CookieProvider(req, res);
    //     cookies.setCookie(
    //         constants.has_message,
    //         JSON.stringify(message("Bạn đã sửa thông tin loại phòng thành công!",constantMesages.successCustom)),
    //         1
    //     );
    //     res.redirect("/administrator/type_room/");
    // }

    async deleteTypeRoomHandler(req, res) {
        try {
            let originTypeRoom = await getTypeRoomById(req.params.id);
            await deleteTypeRoom(originTypeRoom._id.toString())
        } catch(e){
            console.log(e);
        }
        
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã xóa thông tin loại phòng thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/administrator/type_room/");
    }

    //quản lý nhân viên
    async user(req,res){
        let admins = await getAllUsers(RoleEnum.Admin);
        let mods = await getAllUsers(RoleEnum.Mod);
        let users = [
            ...admins,
            ...mods
        ]
        res.render("index-manager",{
            page: "admin/index",
            roomPage: "user/management",
            users: users,
            ...defaultAdminNav(),
            ...defaultData(req)
        })
    }

    async addUser(req, res) {
        const roles = await getAllRole()
        res.render("index-manager",{
            page: "admin/index",
            roomPage: "user/add",
            roles: roles,
            ...defaultAdminNav(),
            ...defaultData(req)
        })
    }

    async addUserHandler(req,res){
        let user = {
            name: req.body.tennhanvien,
            phone: req.body.sodienthoai,
            email: req.body.email,
            password: req.body.matkhau,
        }
        console.log("Role", req.body.role);
        await createUser(user, req.body.role);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã thêm nhân viên mới thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/administrator/user/");
    }

    async editUser(req, res) {
        const roles = await getAllRole()
        let currentUser = await getUserById(req.params.id);
        res.render("index-manager",{
            page: "admin/index",
            roomPage: "user/edit",
            currentUser: currentUser,
            roles: roles,
            ...defaultAdminNav(),
            ...defaultData(req)
        })
    }
    async editUserHandler(req,res){
        let originUser = await getUserById(req.params.id);

        originUser.name = req.body.tennhanvien;
        originUser.phone = req.body.sodienthoai;
        originUser.email= req.body.email;
        originUser.role= req.body.role;
        await updateUser(originUser);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã sửa thông tin nhân viên thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/administrator/user/");
    }

    async deleteUserHandler(req, res){
        try {
            let originUser = await getUserById(req.params.id);
            await deleteUser(originUser._id.toString())
        } catch(e){
            console.log(e);
        }

        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã xóa thông tin nhân viên thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/administrator/user/");
    }
}
module.exports = { AdminController }