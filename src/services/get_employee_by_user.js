const {EmployeeRepository} = require('../repositories/index');

async function getEmployeeByUser(user) {
    const employeeRepo = new EmployeeRepository();
    return await employeeRepo.selectOne({
        employee: user,
    });
}


module.exports =  getEmployeeByUser ;