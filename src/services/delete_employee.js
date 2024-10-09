const {EmployeeRepository} = require('../repositories/index');

async function deleteEmployee(id) {
    const employeeRepo = new EmployeeRepository();
    return await employeeRepo.delete(id);
}


module.exports =  deleteEmployee ;