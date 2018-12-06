const express = require("express");
const bodyParser = require("body-parser");
const Car = require("../src/car");
const router = express.Router();
const responseMessages = require("../responseMessages");

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({extended: true}));

//Add Customer to a car
router.post("", (req, res) => {
    const chassisNumber = req.body.chassisNumber;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const street = req.body.street;
    const houseNumber = req.body.houseNumber;
    const postalCode = req.body.postalCode;

    if (Object.keys(req.body).length === 0) {
        responseMessages.ErrorCode412MissingValues(res);
    } else if (chassisNumber != null && firstName != null && lastName != null && age != null && street != null && houseNumber != null && postalCode != null) {
        Car.findOne({ chassisNumber: chassisNumber }, function (err, carDocs) {
            if (err || carDocs === null) {
                responseMessages.ErrorCode422(res);
            } else {
                carDocs.ownedBy = {
                    firstName: firstName,
                    lastName: lastName,
                    age: age,
                    street: street,
                    houseNumber: houseNumber,
                    postalCode: postalCode
                };
                carDocs.save()
                    .then(() => {
                        responseMessages.SuccessCode201CreateCustomer(res,chassisNumber,firstName,lastName,age,street,houseNumber,postalCode);
                    })
                    .catch(err => {
                        console.warn(err);
                        responseMessages.ErrorCode409Duplicate(res)
                    })
            }
        });
    } else {
        responseMessages.ErrorCode412(result);
    }
});

//Change Customer of a car
router.put("", (req, res) => {
    const chassisNumber = req.body.chassisNumber;
    const newFirstName = req.body.newFirstName;
    const newLastName = req.body.newLastName;
    const newAge = req.body.newAge;
    const newStreet = req.body.newStreet;
    const newHouseNumber = req.body.newHouseNumber;
    const newPostalCode = req.body.newPostalCode;

    if (Object.keys(req.body).length === 0) {
        responseMessages.ErrorCode412MissingValues(res);
    } else if (chassisNumber != null && newFirstName != null && newLastName != null && newAge != null && newStreet != null && newHouseNumber != null && newPostalCode != null) {
        Car.findOne({ chassisNumber: chassisNumber }, function (err, carDocs) {
            if (err || carDocs === null) {
                responseMessages.ErrorCode422(res);
            } else {
                carDocs.ownedBy.firstName = newFirstName;
                carDocs.ownedBy.lastName = newLastName;
                carDocs.ownedBy.age = newAge;
                carDocs.ownedBy.street = newStreet;
                carDocs.ownedBy.houseNumber = newHouseNumber;
                carDocs.ownedBy.postalCode = newPostalCode;
                carDocs.save()
                    .then(() => {
                        responseMessages.SuccessCode200UpdateCustomer(res,chassisNumber,newFirstName,newLastName,newAge,newStreet,newHouseNumber,newPostalCode);
                    })
                    .catch(err => {
                        console.warn(err);
                        responseMessages.ErrorCode409Duplicate(res)
                    })
            }
        });
    } else {
        responseMessages.ErrorCode412(result);
    }
});

//Delete Customer of a car
router.delete("", (req, res) => {
    const chassisNumber = req.body.chassisNumber;

    if (Object.keys(req.body).length === 0) {
        responseMessages.ErrorCode412MissingValues(res);
    } else if (chassisNumber != null) {
        Car.findOne({ chassisNumber: chassisNumber }, function (err, carDocs) {
            if (err || carDocs === null) {
                responseMessages.ErrorCode422(res);
            } else {
                carDocs.ownedBy = null;
                carDocs.save()
                    .then(() => {
                        responseMessages.SuccessCode204(res);
                    })
                    .catch(err => {
                        console.warn(err);
                        responseMessages.ErrorCode409Duplicate(res)
                    })
            }
        });
    } else {
        responseMessages.ErrorCode412(result);
    }
});

module.exports = router;