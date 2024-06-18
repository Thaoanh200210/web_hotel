const { RoleEnum } = require('../models/enum/role');
const {EmployeeRepository} = require('../repositories/index');

async function getAllUsersByHotel(hotel,role = RoleEnum.Customer) {
    const employeeRepo = new EmployeeRepository();
    let employees = await employeeRepo.select({
        hotel:hotel,
    });
    return employees.map(item => item.employee)
}

module.exports =  getAllUsersByHotel ;