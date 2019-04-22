const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const Car = require('../src/car');
const Employee = require('../src/employee');

describe('Tests Delete Endpoints', () => {
    let token = '';

    beforeEach((done) => {
        request(app)
            .post('/login')
            .send({
                "username": "MochaTest",
                "password": "MochaTest1234"
            })
            .end((err, res) => {
                token = res.body.token;
                request(app)
                    .post('/car')
                    .send({
                        "chassisNumber": 56875687,
                        "brand": "TESTBRAND",
                        "fuelType": "TESTFUELTYPE",
                        "typeCar": "TESTTYPECAR"
                    })
                    .set('X-Access-Token', token)
                    .end((err, res) => {
                        request(app)
                            .post('/employee')
                            .send({
                                "firstName": "EmployeeFirstName",
                                "lastName": "EmployeeLastName",
                                "department": "EmployeeDepartment",
                                "job": "EmployeeJob"
                            })
                            .set('X-Access-Token', token)
                            .end((err, res) => {
                                request(app)
                                    .post('/customer')
                                    .send({
                                        "chassisNumber": 56875687,
                                        "firstName": "CustomerCreateTest",
                                        "lastName": "CustomerCreateTest",
                                        "age": 22,
                                        "street": "CustomerCreateTest",
                                        "houseNumber": 22,
                                        "postalCode": "CustomerCreateTest"
                                    })
                                    .set('X-Access-Token', token)
                                    .end((err, res) => {
                                        done();
                                    });
                            })
                    });
            });
    });

    it('Delete a Car', (done) => {
        request(app)
            .del('/car/0')
            .set('X-Access-Token', token)
            .end((err, res) => {
                Car.findOne({ "chassisNumber": 0 })
                    .then((car) => {
                        assert(car === null);
                        done();
                    })
            })
    });

    it('Delete a Car without params so 404', (done) => {
        request(app)
            .del('/car/')
            .set('X-Access-Token', token)
            .end((err, res) => {
                assert(res.status === 404);
                done();
            })
    });

    it('Delete a Employee', (done) => {
        request(app)
            .get('/employee')
            .set('X-Access-Token', token)
            .end((err, res) => {
                Employee.find()
                    .then((employee) => {
                        request(app)
                            .del('/employee/' + employee[0]._id)
                            .set('X-Access-Token', token)
                            .end((err, res) => {
                                Employee.findOne({ "_id": employee[0]._id })
                                    .then((employee) => {
                                        assert(employee === null);
                                        done();
                                    })
                            })
                    })
            });
    });

    it('Delete a Employee without params so 404', (done) => {
        request(app)
            .del('/car/')
            .set('X-Access-Token', token)
            .end((err, res) => {
                assert(res.status === 404);
                done();
            })
    });

    it('Delete a Customer', (done) => {
        request(app)
            .get('/car')
            .set('X-Access-Token', token)
            .end((err, res) => {
                Car.find()
                    .then((car) => {
                        request(app)
                            .del('/customer/' + car[0].chassisNumber)
                            .set('X-Access-Token', token)
                            .end((err, res) => {
                                Car.findOne({ "chassisNumber": car[0].chassisNumber })
                                    .then((car) => {
                                        assert(car.ownedBy === null);
                                        done();
                                    })
                            })
                    })
            });
    });

    it('Delete a Customer without params so 404', (done) => {
        request(app)
            .del('/customer/')
            .set('X-Access-Token', token)
            .end((err, res) => {
                assert(res.status === 404);
                done();
            })
    });
});
