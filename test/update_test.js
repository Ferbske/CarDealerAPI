const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const Car = require('../src/car');
const Employee = require('../src/employee');

describe('Tests Update Endpoints', () => {
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

    it('Update a Car', (done) => {
        request(app)
            .put('/car')
            .send({
                "chassisNumber": 56875687,
                "newBrand": "Updatetest",
                "newFuelType": "Updatetest",
                "newTypeCar": "Updatetest"
            })
            .set('X-Access-Token', token)
            .end((err, res) => {
                Car.findOne({"chassisNumber": 56875687})
                    .then((car) => {
                        assert(car.brand === "Updatetest");
                        assert(car.fuelType === "Updatetest");
                        assert(car.typeCar === "Updatetest");
                        done();
                    })
            })
    });

    it('Update a Car missing all values', (done) => {
        request(app)
            .put('/car')
            .send({})
            .set('X-Access-Token', token)
            .end((err, res) => {
                assert(res.status === 412);
                done();
            })
    });

    it('Update a Car missing a value', (done) => {
        request(app)
            .put('/car')
            .send({
                "chassisNumber": 56875687,
                "newBrand": "Updatetest",
                "newFuelType": "Updatetest",
            })
            .set('X-Access-Token', token)
            .end((err, res) => {
                assert(res.status === 412);
                done();
            })
    });

    it('Update a Employee', (done) => {
        request(app)
            .get('/employee')
            .set('X-Access-Token', token)
            .end((err, res) => {
                Employee.find()
                    .then((employee) => {
                        request(app)
                            .put('/employee')
                            .set('X-Access-Token', token)
                            .send({
                                "employeeID": employee[0]._id,
                                "newFirstName": "newFirstName",
                                "newLastName": "newLastName",
                                "newDepartment": "newDepartment",
                                "newJob": "newJob"
                            })
                            .end((err, res) => {
                                Employee.findOne({ "_id": employee[0]._id })
                                    .then((employeeUpdated) => {
                                        assert(employeeUpdated.firstName === "newFirstName");
                                        assert(employeeUpdated.lastName === "newLastName");
                                        assert(employeeUpdated.department === "newDepartment");
                                        assert(employeeUpdated.job === "newJob");
                                        done();
                                    })
                            })
                    })
            });
    });

    it('Update a Employee missing all values', (done) => {
        request(app)
            .get('/employee')
            .set('X-Access-Token', token)
            .end((err, res) => {
                Employee.find()
                    .then((employee) => {
                        request(app)
                            .put('/employee')
                            .set('X-Access-Token', token)
                            .send({
                            })
                            .end((err, res) => {
                                assert(res.status === 412);
                                done()
                            })
                    })
            });
    });

    it('Update a Employee missing a value', (done) => {
        request(app)
            .get('/employee')
            .set('X-Access-Token', token)
            .end((err, res) => {
                Employee.find()
                    .then((employee) => {
                        request(app)
                            .put('/employee')
                            .set('X-Access-Token', token)
                            .send({
                                "employeeID": employee[0]._id,
                                "newFirstName": "newFirstName",
                                "newLastName": "newLastName",
                                "newDepartment": "newDepartment",
                            })
                            .end((err, res) => {
                                assert(res.status === 412);
                                done()
                            })
                    })
            });
    });

    it('Update a Customer on a Car', (done) => {
        request(app)
            .put('/customer')
            .send({
                "chassisNumber": 56875687,
                "newFirstName": "UpdatedCustomer",
                "newLastName": "UpdatedCustomer",
                "newAge": 44,
                "newStreet": "UpdatedCustomer",
                "newHouseNumber": 44,
                "newPostalCode": "UpdatedCustomer"
            })
            .set('X-Access-Token', token)
            .end((err, res) => {
                Car.findOne({ chassisNumber: 56875687 })
                    .then((car) => {
                        assert(car.ownedBy.firstName === "UpdatedCustomer");
                        assert(car.ownedBy.lastName === "UpdatedCustomer");
                        assert(car.ownedBy.age === 44);
                        assert(car.ownedBy.street === "UpdatedCustomer");
                        assert(car.ownedBy.houseNumber === 44);
                        assert(car.ownedBy.postalCode === "UpdatedCustomer");
                        done();
                    })
            })
    });

    it('Update a Customer on a Car missaing all values', (done) => {
        request(app)
            .put('/customer')
            .send({
            })
            .set('X-Access-Token', token)
            .end((err, res) => {
                assert(res.status === 412);
                done();
            })
    });

    it('Update a Customer on a Car missing a value', (done) => {
        request(app)
            .put('/customer')
            .send({
                "chassisNumber": 56875687,
                "newFirstName": "UpdatedCustomer",
                "newLastName": "UpdatedCustomer",
                "newAge": 44,
                "newStreet": "UpdatedCustomer",
                "newHouseNumber": 44
            })
            .set('X-Access-Token', token)
            .end((err, res) => {
                assert(res.status === 412);
                done();
            })
    });
});