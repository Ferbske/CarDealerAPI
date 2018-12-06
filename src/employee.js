const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'FirstName is required'],
    },
    lastName: {
        type: String,
        required: [true, 'LastName is required']
    },
    department: {
        type: String,
        required: [true, 'Department is required']
    },
    job: {
        type: String,
        required: [true, 'Job is required']
    }
});

const Employee = mongoose.model('employee', EmployeeSchema);

module.exports = Employee;