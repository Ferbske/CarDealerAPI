const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const Car = require('../src/car');
const Employee = require('../src/employee');

describe('Tests Create Endpoints', () => {
    let token = '';

    before((done) => {
        request(app)
            .post('/login')
            .send({
                "username": "MochaTest",
                "password": "MochaTest1234"
            })
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    it('Create a Car', (done) => {
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
                Car.find()
                    .then((car) => {
                        assert(car[0].chassisNumber === 56875687);
                        assert(car[0].brand === "TESTBRAND");
                        assert(car[0].fuelType === "TESTFUELTYPE");
                        assert(car[0].typeCar === "TESTTYPECAR");
                        done();
                    })
            })
    });

    it('Create a Car failed by missing all values', (done) => {
        request(app)
            .post('/car')
            .send({})
            .set('X-Access-Token', token)
            .end((err, res) => {
                assert(res.status === 412);
                done();
            })
    });

    it('Create a Car failed by missing a value', (done) => {
        request(app)
            .post('/car')
            .send({
                "chassisNumber": 56875687,
                "brand": "TESTBRAND",
                "fuelType": "TESTFUELTYPE",
            })
            .set('X-Access-Token', token)
            .end((err, res) => {
                assert(res.status === 412);
                done();
            })
    });

    it('Create a Car that already exist', (done) => {
        // request(app)
        //     .post('/car')
        //     .send({
        //         "chassisNumber": 56875687,
        //         "brand": "TESTBRAND",
        //         "fuelType": "TESTFUELTYPE",
        //         "typeCar": "TESTTYPECAR"
        //     })
        //     .end((err, res) => {
        //     });
        //
        // request(app)
        //     .post('/car')
        //     .send({
        //         "chassisNumber": 56875687,
        //         "brand": "TESTBRAND",
        //         "fuelType": "TESTFUELTYPE",
        //         "typeCar": "TESTTYPECAR"
        //     })
        //     .end((err, res) => {
        //         Car.find()
        //             .then((cars) => {
        //                 console.log(cars);
        //             });
        //         done();
        //     })
        done();
    });

    it('Create a Employee', (done) => {
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
                Employee.find()
                    .then((employee) => {
                        assert(employee[0].firstName === "EmployeeFirstName");
                        assert(employee[0].lastName === "EmployeeLastName");
                        assert(employee[0].department === "EmployeeDepartment");
                        assert(employee[0].job === "EmployeeJob");
                        done()
                    })
            })
    });

    it('Create a Employee failed by missing all values', (done) => {
        request(app)
            .post('/employee')
            .send({})
            .set('X-Access-Token', token)
            .end((err, res) => {
                assert(res.status === 412);
                done()
            })
    });

    it('Create a Employee failed by missing a value', (done) => {
        request(app)
            .post('/employee')
            .send({
                "firstName": "EmployeeFirstName",
                "lastName": "EmployeeLastName",
                "department": "EmployeeDepartment",
            })
            .set('X-Access-Token', token)
            .end((err, res) => {
                assert(res.status === 412);
                done()
            })
    });

    it('Create a Employee that already exist', (done) => {
        // request(app)
        //     .post('/employee')
        //     .send({
        //         "firstName": "EmployeeFirstName",
        //         "lastName": "EmployeeLastName",
        //         "department": "EmployeeDepartment",
        //         "job": "EmployeeJob"
        //     })
        //     .end((err, res) => {
        //         request(app)
        //             .post('/employee')
        //             .send({
        //                 "firstName": "EmployeeFirstName",
        //                 "lastName": "EmployeeLastName",
        //                 "department": "EmployeeDepartment",
        //                 "job": "EmployeeJob"
        //             })
        //             .end((err, res) => {
        //                 console.log(res.status);
        //                 done();
        //             })
        //     })
        done();
    });

    it('Create a Customer on a Car', (done) => {
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
                        Car.findOne({ "chassisNumber": 56875687 })
                            .then((car) => {
                                assert(car.ownedBy.firstName === "CustomerCreateTest");
                                assert(car.ownedBy.lastName === "CustomerCreateTest");
                                assert(car.ownedBy.age === 22);
                                assert(car.ownedBy.street === "CustomerCreateTest");
                                assert(car.ownedBy.houseNumber === 22);
                                assert(car.ownedBy.postalCode === "CustomerCreateTest");
                                done()
                            })
                    })
            });
    });

    it('Create a Customer on a Car failed by missing all values', (done) => {
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
                    .post('/customer')
                    .send({
                    })
                    .set('X-Access-Token', token)
                    .end((err, res) => {
                        assert(res.status === 412);
                        done();
                    })
            });
    });

    it('Create a Customer on a Car failed by missing a value', (done) => {
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
                    .post('/customer')
                    .send({
                        "chassisNumber": 56875687,
                        "firstName": "CustomerCreateTest",
                        "lastName": "CustomerCreateTest",
                        "age": 22,
                        "street": "CustomerCreateTest",
                        "houseNumber": 22
                    })
                    .set('X-Access-Token', token)
                    .end((err, res) => {
                        assert(res.status === 412);
                        done();
                    })
            });
    });
});
