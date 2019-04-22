const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const Car = require('../src/car');
const Employee = require('../src/employee');

describe('Tests Read Endpoints', () => {
    let token = '';

    beforeEach((done) =>
    {
        request(app)
            .post('/login')
            .send({
                "username": "MochaTest",
                "password": "MochaTest1234"
            })
            .end((err, res) => {
                token = res.body.token;
                for (let i = 0; i < 4; i++) {
                    request(app)
                        .post('/car')
                        .send({
                            "chassisNumber": i,
                            "brand": "Read Test",
                            "fuelType": "TESTFUELTYPE",
                            "typeCar": "TESTTYPECAR"
                        })
                        .set('X-Access-Token', token)
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
                        .set('X-Access-Token', token)
                        .end((err, res) => {
                        })
                }
                done();
            });
    });

    it('Read all Cars', (done) => {
        request(app)
            .get('/car')
            .set('X-Access-Token', token)
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

    it('Read a Car', (done) => {
        request(app)
            .get('/car/2')
            .set('X-Access-Token', token)
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
            .set('X-Access-Token', token)
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
            .set('X-Access-Token', token)
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
