const express = require("express");
const bodyParser = require("body-parser");
const Employee = require("../src/employee");
const router = express.Router();
const responseMessages = require("../responseMessages");

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({extended: true}));

//Get all Cars
router.get("", (req, res) => {
    Employee.find({}, function (err, docs) {
        if (err || docs === null) {
            responseMessages.ErrorCode412MissingValues(res);
        } else {
            responseMessages.SuccessCode200GetAll(res, docs);
        }
    });
});

//Get 1 Employee
router.get("/:employeeID", (req, res) => {
    const employeeID = req.params.employeeID;

    Employee.find({ _id: employeeID }, function (err, docs) {
        if (err || docs === null) {
            responseMessages.ErrorCode412MissingValues(res);
        } else {
            responseMessages.SuccessCode200GetAll(res, docs);
        }
    })
});

//Create 1 Employee
router.post("", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const department = req.body.department;
    const job = req.body.job;

    if (Object.keys(req.body).length === 0) {
        responseMessages.ErrorCode412MissingValues(res);
    }  else if (firstName != null && lastName != null && department != null && job != null) {
        const newEmployee = new Employee({
            firstName: firstName,
            lastName: lastName,
            department: department,
            job: job
        });

        newEmployee.save()
            .then(() => {
                responseMessages.SuccessCode201CreateEmployee(res, firstName, lastName, department, job);
            })
            .catch(err => {
                console.warn(err);
                responseMessages.ErrorCode409Duplicate(res);
            })
    } else {
        responseMessages.ErrorCode412MissingValues(res);
    }
});

//Update 1 Employee
router.put("", (req, res) => {
    const employeeID = req.body.employeeID;
    const newFirstName = req.body.newFirstName;
    const newLastName = req.body.newLastName;
    const newDepartment = req.body.newDepartment;
    const newJob = req.body.newJob;

    if (Object.keys(req.body).length === 0) {
        responseMessages.ErrorCode412MissingValues(res);
    }  else if (employeeID != null && newFirstName != null && newLastName != null && newDepartment != null && newJob != null) {
        Employee.findOne({ _id: employeeID }, function (err, docs) {
            if (err || docs === null) {
                responseMessages.ErrorCode412MissingValues(res);
            } else {
                docs.firstName = newFirstName;
                docs.lastName = newLastName;
                docs.department = newDepartment;
                docs.job = newJob;
                docs.save()
                    .then(() => {
                        responseMessages.SuccessCode200UpdateEmployee(res, employeeID, newFirstName, newLastName, newDepartment, newJob);
                    })
                    .catch(err => {
                        console.warn(err);
                        responseMessages.ErrorCode409Duplicate(res);
                    });
            }
        })
    } else {
        responseMessages.ErrorCode412MissingValues(res);
    }
});

//Delete 1 Employee
router.delete("", (req, res) => {
    const employeeID = req.body.employeeID;

    if (Object.keys(req.body).lenth === 0) {
        responseMessages.ErrorCode412MissingValues(res);
    } else if (employeeID != null) {
        Employee.findOne({ _id: employeeID }, function (err, docs) {
            if (err || !docs) {
                responseMessages.ErrorCode412MissingValues(res);
            } else {
                Employee.deleteOne({ "_id": employeeID })
                    .then(() => {
                        responseMessages.SuccessCode204(res);
                    });
            }
        })
    } else {
        responseMessages.ErrorCode412MissingValues(res);
    }
});

module.exports = router;