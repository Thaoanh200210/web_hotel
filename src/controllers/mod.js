const defaultData = require('../helper/default-data');
const defaultModNav = require('../helper/default-mod-nav');
const message = require('../helper/message');
const constants = require('../constants');
const constantMesages = require('../constants/message');
const { CookieProvider } = require('../helper/cookies');
const { RoleEnum } = require('../models/enum/role');
const getAllHotel = require('../services/get_all_hotel');
const getAllCity = require('../services/get_all_city');
const getHotelById = require('../services/get_hotel_by_id');
const getCityById = require('../services/get_city_by_id');
const createHotel = require('../services/create_hotel');
const createCity = require('../services/create_city');
const createUser = require('../services/create_user');
const createEmployee = require('../services/create_employee');
const updateCity = require('../services/update_city');
const updateHotel = require('../services/update_hotel');
const deleteCity = require('../services/delete_city');
const deleteHotel = require('../services/delete_hotel');

const numberOfServices = require('../services/number_of_service');
const uploadImageFromLocal = require('../services/upload_image_from_local');

class ModController {
  async city(req, res) {
    let citys = await getAllCity();
    res.render('index-manager', {
      page: 'mod/index',
      roomPage: 'city/management',
      citys: citys,
      ...defaultModNav(),
      ...defaultData(req),
    });
  }

  async addCity(req, res) {
    res.render('index-manager', {
      page: 'mod/index',
      roomPage: 'city/add',
      ...defaultModNav(),
      ...defaultData(req),
    });
  }

  async editCity(req, res) {
    let city = await getCityById(req.params.id);
    res.render('index-manager', {
      page: 'mod/index',
      roomPage: 'city/edit',
      ...defaultModNav(),
      ...defaultData(req),
      city: city,
    });
  }

  // adđ
  async addCityHandler(req, res, next) {
    try {
      const {
        file,
        body: { folderName, cityName },
      } = req;

      if (!file) {
        return res.status(400).send('No file uploaded.');
      }

      const imageData = await uploadImageFromLocal(file.path, folderName, file.filename);

      const city = {
        name: cityName,
        image: imageData.img_url,
      };

      await createCity(city);

      let cookies = new CookieProvider(req, res);
      cookies.setCookie(
        constants.has_message,
        JSON.stringify(message('Bạn đã thêm thành phố mới thành công!', constantMesages.successCustom)),
        1,
      );

      return res.redirect('/mod/city');
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error adding city.');
    }
  }

  async deleteCityHandler(req, res) {
    try {
      let originCity = await getCityById(req.params.id);
      await deleteCity(originCity._id.toString());
    } catch (e) {
      console.log(e);
    }

    let cookies = new CookieProvider(req, res);
    cookies.setCookie(
      constants.has_message,
      JSON.stringify(message('Bạn đã xóa thông tin địa điểm thành công!', constantMesages.successCustom)),
      1,
    );
    res.redirect('/mod/city/');
  }

  //edit city
  async editCityHandler(req, res, next) {
    try {
      console.log('Enter::', req.params.id);
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
          JSON.stringify(message('Bạn đã sửa thông tin thành phố thành công!', constantMesages.successCustom)),
          1,
        );
        res.redirect('/mod/city/');
      }
    } catch (e) {
      console.log('Error when editing city:: ', e.message);
    }
  }

  //hotel
  async hotel(req, res) {
    let hotels = await getAllHotel();
    res.render('index-manager', {
      page: 'mod/index',
      roomPage: 'hotel/management',
      hotels: hotels,
      ...defaultModNav(),
      ...defaultData(req),
    });
  }

  async addHotel(req, res) {
    let citys = await getAllCity();
    res.render('index-manager', {
      page: 'mod/index',
      roomPage: 'hotel/add',
      citys: citys,
      ...defaultModNav(),
      ...defaultData(req),
    });
  }

  async addHotelHandler(req, res) {
    let owner = {
      name: req.body.chusohuu,
      phone: req.body.sodienthoai,
      email: req.body.email,
      password: req.body.matkhau,
    };
    let user = await createUser(owner, RoleEnum.Employee);
    let hotel = {
      owner: user,
      name: req.body.tenkhachsan,
      address: req.body.diachi,
      description: req.body.mieuta,
      star: req.body.sosao,
      city_id: req.body.city,
    };
    await createHotel(hotel);
    await createEmployee(hotel, owner);
    let cookies = new CookieProvider(req, res);
    cookies.setCookie(
      constants.has_message,
      JSON.stringify(message('Bạn đã thêm khách sạn mới thành công!', constantMesages.successCustom)),
      1,
    );
    res.redirect('/mod/hotel/');
  }

  async editHotel(req, res) {
    let hotel = await getHotelById(req.params.id);
    res.render('index-manager', {
      page: 'mod/index',
      roomPage: 'hotel/edit',
      ...defaultModNav(),
      ...defaultData(req),
      hotel: hotel,
    });
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
      JSON.stringify(message('Bạn đã sửa thông tin khách sạn thành công!', constantMesages.successCustom)),
      1,
    );
    res.redirect('/mod/hotel/');
  }

  async activateHotelHandler(req, res) {
    let originHotel = await getHotelById(req.params.id);
    originHotel.isActive = true;
    await updateHotel(originHotel);
    let cookies = new CookieProvider(req, res);
    cookies.setCookie(
      constants.has_message,
      JSON.stringify(message('Bạn đã kich hoat khách sạn thành công!', constantMesages.successCustom)),
      1,
    );
    res.redirect('/mod/hotel/');
  }

  async negateHotelHandler(req, res) {
    let originHotel = await getHotelById(req.params.id);
    originHotel.isActive = false;
    await updateHotel(originHotel);
    let cookies = new CookieProvider(req, res);
    cookies.setCookie(
      constants.has_message,
      JSON.stringify(message('Bạn đã vo hieu khách sạn thành công!', constantMesages.successCustom)),
      1,
    );
    res.redirect('/mod/hotel/');
  }

  async deleteHotelHandler(req, res) {
    await deleteHotel(req.params.id);
    let cookies = new CookieProvider(req, res);
    cookies.setCookie(
      constants.has_message,
      JSON.stringify(message('Bạn đã xoa khách sạn thành công!', constantMesages.successCustom)),
      1,
    );
    res.redirect('/mod/hotel/');
  }
}
module.exports = { ModController };
