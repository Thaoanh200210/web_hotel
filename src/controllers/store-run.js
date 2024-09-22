const defaultData = require("../helper/default-data")
const message = require("../helper/message")
const {CookieProvider} = require("../helper/cookies")
const constants = require("../constants")
const constantMesages = require("../constants/message") 
const getUserById  = require("../services/get_user_by_id")
const createBookings = require("../services/create_booking")
const createReview = require("../services/create_review")
const createBookingDetails = require("../services/create_booking_detail")
const getRoomById  = require("../services/get_room_by_id")
const getTypeRoomById  = require("../services/get_type_room_by_id")
const getSelectionById  = require("../services/get_selection_by_id")
const getTypeRoomByIdAndHotel  = require("../services/get_type_of_room_by_id_and_hotel")
const getImageOfHotel = require("../services/get_image_of_hotel")
const getDiscountByDay = require("../services/get_discount_by_day")
const getAllTypeRoomByHotel = require("../services/get_all_type_of_room_by_hotel")
const updateUser = require("../services/update_user");
const getAllReviews = require("../services/get_all_review")
const getBookingById = require("../services/get_booking_by_id")
const getBookingByUser = require("../services/get_booking_by_user")
const getCurrentEvent = require("../services/get_current_event")
const getAllHotel = require("../services/get_all_hotel")
const getHotelByCity = require("../services/get_hotels_by_city")
const getCityByID = require("../services/get_city_by_id")
const getAllCities = require("../services/get_all_city")
const cancelBooking = require("../services/cancel_booking")
const getHotelByName = require("../services/get_hotel_by_name");
const getRoomByName = require("../services/get_room_by_name");
const getAllRooms = require("../services/get_all_rooms")
const getServiceByID = require("../services/get_service_by_id")
const getSelectionByID = require("../services/get_selection_by_id")

//controller nơi nhận dữ liệu từ request(req) => vào Service xử lý dữ liệu 
//=> gọi repository để truy cập vào database  thông qua models
const getPriceOfTypeOfRoom = (rooms,discount) => {
    let prices = rooms.map((room) => room.original_price);
    let maxPrice = Math.max.apply(null, prices);
    let minPrice = Math.min.apply(null, prices);
    if(maxPrice && maxPrice == minPrice){
        if(discount != 0){
            let gia_goc = "<span style='text-decoration-line: line-through;'>" + parseInt(maxPrice).toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) + "</span>";
            let gia_giam = "<span style='color:red;'>" + parseInt(maxPrice - maxPrice*discount).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})+ "</span>(" + discount*100 + '%)';
            return gia_goc + ' ' + gia_giam;
        }
        return parseInt(maxPrice).toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    } else if (maxPrice && maxPrice > minPrice){
        if(discount != 0){
            let gia_goc = "<span style='text-decoration-line: line-through;'>" +
            parseInt(minPrice).toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) + 
            " -> " +
            parseInt(maxPrice).toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) + 
            "</span>";
            let gia_giam = "<span style='color:red;'>" + 
            parseInt(minPrice - minPrice*discount).toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) + 
            " -> " +
            parseInt(maxPrice - maxPrice*discount).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})+ 
            "</span>(" + discount*100 + '%)';
            return gia_goc + ' ' + gia_giam;
        }
        return parseInt(minPrice).toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) + 
        " -> " +
        parseInt(maxPrice).toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    } else {
        return ""
    }
}
const getServiceOfTypeOfRoom = (rooms) => {
    let services = rooms.map((room) => room.services);
    let mergedServices = services.flat();
    return mergedServices.filter((v,i,a)=>a.findIndex(t=>(t._id.toString() === v._id.toString()))===i)
}

const getSelectionOfTypeOfRoom = (rooms) => {
    let selections = rooms.map((room) => room.selections);
    let mergedSelections = selections.flat();
    return mergedSelections.filter((v,i,a)=>a.findIndex(t=>(t._id.toString() === v._id.toString()))===i)
}
class StoreRunController{
    async homepage(req, res) {
        let hotels = await getAllHotel(true);
        let cities = await getAllCities();
        let getPriceOfHotel = (hotel) => {
            let prices = hotel.rooms.map((room) => room.original_price);
            // let maxPrice = Math.max.apply(null, prices);
            let minPrice = Math.min.apply(null, prices);
            return parseInt(minPrice).toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        }

        //đến home/index
        res.render("index",{
            page: "home/index",
            getPriceOfHotel:getPriceOfHotel,
            hotels: hotels,
            cities: cities,
            ...defaultData(req)
        })
    }
    async hotels(req, res) {
        const cityID = req.params.cityID;
        let cityName = {name: "toàn quốc"};
        let hotels = [];
        if (cityID === "all") {
            hotels = await getAllHotel(true);
            hotels = hotels.filter(hotel => hotel.isActive === true);
        } else {
            hotels = await getHotelByCity(cityID);
            cityName = await getCityByID(cityID);
        }
        let name = req.query.name;  
        if (name) {
            hotels = hotels.filter(hotel => hotel.name.toLowerCase().includes(name.toLowerCase()));
        }
        let getPriceOfHotel = (hotel) => {
            if (!Array.isArray(hotel.rooms) || hotel.rooms.length === 0) {
                return "???";
            }
            let prices = hotel.rooms.map((room) => room.original_price);
            let minPrice = Math.min.apply(null, prices);
            return parseInt(minPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
        };

        //đến home/index
        res.render("index",{
            page: "home/hotels",
            getPriceOfHotel:getPriceOfHotel,
            hotels: hotels,
            city: cityName,
            ...defaultData(req)
        })
    }

    async myUser(req, res) {
        let cookies = new CookieProvider(req, res);
        let userString = cookies.getCookie(constants.user_info);
        let customer = await getUserById(JSON.parse(userString)._id) 
        res.render("index",{
            page: "home/user",
            customer:customer,
            ...defaultData(req)
        })
    }
    async myUserEditHandler(req, res) {
        let originUser = await getUserById(req.params.id);
        originUser.name = req.body.fullName;
        originUser.phone = req.body.phone;
        originUser.address= req.body.address;
        originUser.gioitinh= req.body.gender;
        originUser.birth= req.body.dob;
        originUser.email= req.body.email;
        originUser.cmnd= req.body.idCard;
        await updateUser(originUser);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã cập nhật thông tin tài khoản thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/myUser");
    }
    async blog(req, res) {
        res.render("index",{
            page: "home/blog",
            ...defaultData(req)
        })
    }

    async review(req, res) {
        let booking = await getBookingById(req.params.bookingId,true);
        let haveReview = (reviews, currentBookingDetail) => {
            let review =  reviews.filter(review => review.room._id.toString() == currentBookingDetail.room._id.toString() ); 
            return review.length > 0;
        }
        let getReview = (reviews, currentBookingDetail) => {
            let review =  reviews.filter(review => review.room._id.toString() == currentBookingDetail.room._id.toString() ); 
            return review[0];
        }
        res.render("index",{
            page: "home/review",
            booking: booking,
            haveReview: haveReview,
            getReview: getReview,
            ...defaultData(req)
        })
    }
    async contact(req, res) {
        res.render("index",{
            page: "home/contact",
            ...defaultData(req)
        })
    }
    async hotel(req, res) {
        res.render("index",{
            page: "home/hotel",
            ...defaultData(req)
        })
    }
    async services(req, res) {
        res.render("index",{
            page: "home/services",
            ...defaultData(req)
        })
    }
    async room(req, res) {
        let ngaydau = req.query.ngaydau;
        let ngayket = req.query.ngayket;

        let images = await getImageOfHotel(req.hotel);
        let typeRooms = await getAllTypeRoomByHotel(req.hotel, ngaydau, ngayket);
        let reviews = await getAllReviews(req.hotel);
        let events = await getCurrentEvent(req.hotel);

        let employeeScore = 0; 
        let sactificationScore = 0; 
        let wifiScore = 0;
        let comfortScore = 0; 
        let moneyScore = 0; 
        let cleanlinessScore = 0; 
        

        for(let review of reviews){
            employeeScore += review.employeeScore;
            sactificationScore += review.sactificationScore;
            wifiScore += review.wifiScore;
            comfortScore += review.comfortScore;
            moneyScore += review.moneyScore;
            cleanlinessScore += review.cleanlinessScore;
        }

        let discounts = events.map(event => event.discount_percent);
        let maxDiscount = 0;
        if(discounts.length !=0 ){
            maxDiscount = Math.max.apply(null,discounts);
        }

        let discount =  maxDiscount/100;
        employeeScore = Math.floor(employeeScore/reviews.length)/10 ;
        sactificationScore = Math.floor(sactificationScore/reviews.length)/10 ;
        wifiScore = Math.floor(wifiScore/reviews.length)/10 ;
        comfortScore = Math.floor(comfortScore/reviews.length)/10 ;
        moneyScore = Math.floor(moneyScore/reviews.length)/10 ;
        cleanlinessScore = Math.floor(cleanlinessScore/reviews.length)/10 ;
        reviews = reviews.sort((a,b) => {
            return (
                (
                    a.employeeScore + 
                    a.sactificationScore + 
                    a.wifiScore + 
                    a.comfortScore + 
                    a.moneyScore + 
                    a.cleanlinessScore  
                ) - 
                (
                    b.employeeScore + 
                    b.sactificationScore + 
                    b.wifiScore + 
                    b.comfortScore + 
                    b.moneyScore + 
                    b.cleanlinessScore
                )
            )*-1
        }
        );

        res.render("index",{
            page: "home/room",
            images: images,
            typeRooms: typeRooms,
            reviews: reviews,
            employeeScore: employeeScore,
            wifiScore: wifiScore,
            sactificationScore:sactificationScore,
            comfortScore:comfortScore,
            cleanlinessScore:cleanlinessScore,
            moneyScore: moneyScore,
            discount:discount,
            ngaydau:ngaydau,
            ngayket:ngayket,
            getPriceOfTypeOfRoom: getPriceOfTypeOfRoom,
            getServiceOfTypeOfRoom: getServiceOfTypeOfRoom,
            getSelectionOfTypeOfRoom:getSelectionOfTypeOfRoom,
            ...defaultData(req)
        })
    }

    async logout(req, res) {
        let cookies = new CookieProvider(req, res);
        cookies.clearCookie(constants.user_info);
        return res.redirect('/');
    }

    async booking(req, res) {
        let events = await getCurrentEvent(req.hotel);
        let discounts = events.map(event => event.discount_percent);
        let maxDiscount = 0;
        if(discounts.length !=0 ){
            maxDiscount = Math.max.apply(null,discounts);
        }
        let discount =  maxDiscount/100;
        if(!req.user){
            let cookies = new CookieProvider(req, res);
            cookies.setCookie(
                constants.has_message,
                JSON.stringify(message("Người dùng chưa đăng nhập",constantMesages.errorCustom)),
                1
            );
            return res.redirect("/hotel/"+req.hotel._id+"/room")
        }
        let ngaydau = req.query.ngaydau;
        let ngayket = req.query.ngayket;
        let typeRoom = await getTypeRoomByIdAndHotel(req.hotel,req.params.id,ngaydau,ngayket,true);
        let getImageOfTypeOfRoom = (rooms) => {
            let images = rooms.map((room) => room.images);
            let mergedImages = images.flat();
            return mergedImages.filter((v,i,a)=>a.findIndex(t=>(t._id.toString() === v._id.toString()))===i)
        }
        res.render("index",{
            page: "home/room_booking",
            getImageOfTypeOfRoom: getImageOfTypeOfRoom,
            getPriceOfTypeOfRoom: getPriceOfTypeOfRoom,
            getServiceOfTypeOfRoom: getServiceOfTypeOfRoom,
            getSelectionOfTypeOfRoom:getSelectionOfTypeOfRoom,
            ngaydau: ngaydau,
            ngayket:ngayket,
            discount:discount,
            typeRoom: typeRoom,
            ...defaultData(req)
        })
    }
    async bookingHandler(req,res){
        let selection = req.body.luachon;
        let ngaydau = req.query.ngaydau;
        let ngayket = req.query.ngayket;
        const now = new Date();
        let currentSelection = await getSelectionById(selection);
        let isCheckInWithCreditCard = currentSelection.name == 'Thanh toán online qua chuyển khoản';
        let events = await getCurrentEvent(req.hotel);
        let discounts = events.map(event => event.discount_percent);
        let maxDiscount = 0;

        if(discounts.length !=0 ){
            maxDiscount = Math.max.apply(null,discounts);
        }

        let discount =  maxDiscount/100;
        let phongs = req.body.phong;
        let roomDetails  = []
        let total = 0;
        let numberOfDaysBooked = Math.floor((new Date(req.body.ngayket) - new Date(req.body.ngaydau))  / (86400 * 1000));

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
        let cookies = new CookieProvider(req, res);
        let userString = cookies.getCookie(constants.user_info);
        let customer = await getUserById(JSON.parse(userString)._id) ;
        let booking ={
            customer: customer,
            check_in: new Date(req.body.ngaydau).setHours(14),
            check_out: new Date(req.body.ngayket).setHours(12),
            customer_identify_number: req.body.chungminhnhandan,
            total_price: total,
        }
        let currenrtBooking = await createBookings(booking) ;
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
        return res.redirect("/hotel/"+ req.hotel._id.toString() +"/room")
    }
    
    async roomDetail(req, res) {
        let room = await getRoomById(req.params.id,true);
        let events = await getCurrentEvent(req.hotel);
        let discounts = events.map(event => event.discount_percent);
        let maxDiscount = 0;
        if(discounts.length !=0 ){
            maxDiscount = Math.max.apply(null,discounts);
        }
        let discount =  maxDiscount/100;
        res.render("index",{
            page: "home/room_detail",
            room: room,
            discount:discount,
            ...defaultData(req)
        })
    }

    async historicalBooking(req,res){
        let user =  await getUserById(req.user._id);
        let bookings = await getBookingByUser(user,true);
        let checkPayment = (payments) => {
            let check = false;
            for(let payment of payments){
                if(payment.is_success){
                    check = true;
                }
            }
            return check ;
        }
        res.render("index",{
            page: "home/historical_booking",
            bookings: bookings,
            checkPayment : checkPayment,
            ...defaultData(req)
        })
    }

    async cancelBooking(req,res){
        let bookingID = req.params.bookingId;
        await cancelBooking(bookingID)
        res.redirect('/historical-booking/')
    }

    async reviewHandler(req, res) {
        let user =  await getUserById(req.user._id);
        let booking = await getBookingById(req.params.bookingId,false);
        let room = await getRoomById(req.body.phong);
        let review ={
            customer: user,
            booking: booking,
            employeeScore: req.body.nhanvien,
            sactificationScore: req.body.tiennghi,
            wifiScore: req.body.wifi,
            comfortScore:req.body.thoaimai,
            cleanlinessScore:req.body.sachse,
            moneyScore:req.body.dangtien,
            comment: req.body.binhluan,
            room: room,
        }
        await createReview(review);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã đánh giá thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/historical-booking/");
    }
    pageNotFound(req, res) {
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Hi",constantMesages.errorCustom)),
            1
        );

        res.render("index",{
            page: "404"
        })
    }
}
module.exports = { StoreRunController }