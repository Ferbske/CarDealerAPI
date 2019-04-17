const moment = require("moment");

function ErrorCode401(result) {
    result.status(401).json({
        code: 401,
        message: "Unauthorized",
        datetime: moment().format()
    });
}

function ErrorCode409Duplicate(result) {
    result.status(409).json({
        code: 409,
        message: "Conflict, this entry already exists",
        datetime: moment().format()})
}

function ErrorCode412MissingValues(result) {
    result.status(412).json({
        code: 412,
        message: "One or more properties in the request body are invalid or missing",
        datetime: moment().format("Y-mm-D:hh:mm:ss")
    });
}

function ErrorCode412SameValues(result) {
    result.status(412).json({
        code: 412,
        message: "Current and new values are not allowed to the be same",
        datetime: moment().format()
    });
}

function ErrorCode422(result) {
    result.status(422).json({
        code: 422,
        message: "Unprocessable entity",
        datetime: moment().format()
    });
}

function SuccessCode200GetAll(result, docs) {
    result.status(200).json({
        code: 200,
        results: docs,
        datetime: moment().format()
    });
}

function SuccessCode200UpdateCar(result, chassisNumber, brand, fuelType, typeCar) {
    result.status(200).json({
        code: 200,
        message: {
            chassisNumber: chassisNumber,
            brand: brand,
            fuelType: fuelType,
            typeCar: typeCar,
        },
        datetime: moment().format()
    });
}

function SuccessCode200UpdateEmployee(result, employeeID, firstName, lastName, department, job) {
    result.status(200).json({
        code: 200,
        message: {
            employeeID: employeeID,
            firstName: firstName,
            lastName: lastName,
            department: department,
            job: job,
        },
        datetime: moment().format()
    });
}

function SuccessCode200UpdateCustomer(result, chassisNumber, firstName, lastName, age, street, houseNumber, postalCode) {
    result.status(200).json({
        code: 200,
        message: {
            chassisNumber: chassisNumber,
            firstName: firstName,
            lastName: lastName,
            age: age,
            street: street,
            houseNumber: houseNumber,
            postalCode: postalCode
        },
        datetime: moment().format()
    });
}

function SuccessCode200UpdateSoldBy(result, chassisNumber, employeeID) {
    result.status(200).json({
        code: 200,
        message: {
            chassisNumber: chassisNumber,
            employeeID: employeeID
        },
        datetime: moment().format()
    });
}

function Successcode201CreateUser(res, token) {
    res.status(201).json({
        code: 201,
        message: {
            token: token
        },
        datetime: moment().format()
    });
}

function SuccessCode201CreateCar(result, chassisNumber, brand, fuelType, typeCar) {
    result.status(201).json({
        code: 201,
        message: {
            chassisNumber: chassisNumber,
            brand: brand,
            fuelType: fuelType,
            typeCar: typeCar,
        },
        datetime: moment().format()
    });
}

function SuccessCode201CreateEmployee(result, firstName, lastName, department, job) {
    result.status(201).json({
        code: 201,
        message: {
            firstName: firstName,
            lastName: lastName,
            department: department,
            job: job,
        },
        datetime: moment().format()
    });
}

function SuccessCode201CreateCustomer(result, chassisNumber, firstName, lastName, age, street, houseNumber, postalCode) {
    result.status(201).json({
        code: 201,
        message: {
            chassisNumber: chassisNumber,
            firstName: firstName,
            lastName: lastName,
            age: age,
            street: street,
            houseNumber: houseNumber,
            postalCode: postalCode
        },
        datetime: moment().format()
    });
}

function SuccessCode204(result) {
    result.status(204).end();
}

module.exports = {
    ErrorCode401,
    ErrorCode409Duplicate,
    ErrorCode412MissingValues,
    ErrorCode412SameValues,
    ErrorCode422,
    SuccessCode200GetAll,
    SuccessCode200UpdateCar,
    SuccessCode200UpdateEmployee,
    SuccessCode200UpdateCustomer,
    SuccessCode200UpdateSoldBy,
    Successcode201CreateUser,
    SuccessCode201CreateCar,
    SuccessCode201CreateEmployee,
    SuccessCode201CreateCustomer,
    SuccessCode204
};