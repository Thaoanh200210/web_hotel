const {EmployeeRepository} = require('../repositories/index');

async function createEmployee(hotel, employee) {
    const employeeRepo = new EmployeeRepository();
    return await employeeRepo.create({
        hotel: hotel,
        employee: employee,
    });
}


module.exports =  createEmployee ;