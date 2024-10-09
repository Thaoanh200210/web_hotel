const { RoleEnum } = require('../models/enum/role');
const {EmployeeRepository,RoleRepository} = require('../repositories/index');

async function getAllUsersByHotel(hotel,role = RoleEnum.Customer) {
    const employeeRepo = new EmployeeRepository();
    // const roleRepo = new RoleRepository();
    // let roleResult = await roleRepo.selectOne({name: role})
    // return await roomRepo.select({role: roleResult});
    let employees = await employeeRepo.select({
        hotel:hotel,
    });
    return employees.map(item => item.employee)
}

module.exports =  getAllUsersByHotel ;