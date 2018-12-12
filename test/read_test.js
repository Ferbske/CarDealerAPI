const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const Car = require('../src/car');
const Employee = require('../src/employee');

describe('Tests Read Endpoints', () => {
    beforeEach((done) => {
        for (let i = 0; i < 4; i++) {
            request(app)
                .post('/car')
                .send({
                    "chassisNumber": i,
                    "brand": "Read Test",
                    "fuelType": "TESTFUELTYPE",
                    "typeCar": "TESTTYPECAR"
                })
                .end((err, res) => {})
        }

        for (let j = 0; j < 4; j++) {
            request(app)
                .post('/employee')
                .send({
                    "firstName": j + "FN",
                    "lastName": "EmployeeLastName",
                    "department": "EmployeeDepartment",
                    "job": "EmployeeJob"
                })
                .end((err, res) => {
                })
        }
        done();
    });

    it('Read all Cars', (done) => {
        request(app)
            .get('/car')
            .end((err, res) => {
                Car.find()
                    .then((car) => {
                        assert(car.length === 4);
                        done();
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
    });

    it('Read a Cars', (done) => {
        request(app)
            .get('/car/2')
            .end((err, res) => {
                Car.findOne({ "chassisNumber": 2 })
                    .then((car) => {
                        assert(car.chassisNumber === 2);
                        done();
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
    });

    it('Read all Employees', (done) => {
        request(app)
            .get('/employee')
            .end((err, res) => {
                Employee.find()
                    .then((employee) => {
                        assert(employee.length = 4);
                        done();
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
    });

    it('Read a Employee', (done) => {
        request(app)
            .get('/employee')
            .end((err, res) => {
                Employee.find()
                    .then((employee) => {
                        request(app)
                            .get('/employee/' + employee[0]._id)
                            .end((err, res) => {
                                Employee.findOne({ "_id": employee[0]._id })
                                    .then((employeeSingle) => {
                                        assert(employee[0].firstName === employeeSingle.firstName);
                                        done();
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            })
                    })
            })
    });
});
