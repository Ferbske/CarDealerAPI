const express = require("express");
const bodyParser = require("body-parser");
const Car = require("../src/car");
const router = express.Router();
const responseMessages = require("../responseMessages");

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({extended: true}));

//Get all Cars
router.get("", (req, res) => {
    Car.find({}, function (err, docs) {
        if (err || docs === null) {
            responseMessages.ErrorCode412MissingValues(res);
        } else {
            responseMessages.SuccessCode200GetAll(res, docs);
        }
    });
});

//Get 1 Cars
router.get("/:chassisNumber", (req, res) => {
    const chassisNumber = req.params.chassisNumber;

    Car.find({ chassisNumber: chassisNumber }, function (err, docs) {
        if (err || docs === null) {
            responseMessages.ErrorCode412MissingValues(res);
        } else {
            responseMessages.SuccessCode200GetAll(res, docs);
        }
    })
});

//Create 1 Car
router.post("", (req, res) => {
    const chassisNumber = req.body.chassisNumber;
    const brand = req.body.brand;
    const fuelType = req.body.fuelType;
    const typeCar = req.body.typeCar;

    if (Object.keys(req.body).length === 0) {
        responseMessages.ErrorCode412MissingValues(res);
    }  else if (chassisNumber != null && brand != null && fuelType != null && typeCar != null) {
        const newCar = new Car({
            chassisNumber: chassisNumber,
            brand: brand,
            fuelType: fuelType,
            typeCar: typeCar,
            ownedBy: null,
            soldBy: null
        });

        newCar.save()
            .then(() => {
                responseMessages.SuccessCode201CreateCar(res, chassisNumber, brand, fuelType, typeCar);
            })
            .catch(err => {
                console.warn(err);
                responseMessages.ErrorCode409Duplicate(res);
            })
    } else {
        responseMessages.ErrorCode412MissingValues(res);
    }
});

//Update 1 Car
router.put("", (req, res) => {
    const chassisNumber = req.body.chassisNumber;
    const newBrand = req.body.newBrand;
    const newFuelType = req.body.newFuelType;
    const newTypeCar = req.body.newTypeCar;

    if (Object.keys(req.body).length === 0) {
        responseMessages.ErrorCode412MissingValues(res);
    }  else if (chassisNumber != null && newBrand != null && newFuelType != null && newTypeCar != null) {
        Car.findOne({ chassisNumber: chassisNumber }, function (err, docs) {
            if (err || docs === null) {
                responseMessages.ErrorCode412MissingValues(res);
            } else {
                docs.brand = newBrand;
                docs.fuelType = newFuelType;
                docs.typeCar = newTypeCar;
                docs.save()
                    .then(() => {
                        responseMessages.SuccessCode200UpdateCar(res, chassisNumber, newBrand, newFuelType, newTypeCar);
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

//Delete 1 car
router.delete("/:chassisNumber", (req, res) => {
    const chassisNumber = req.params.chassisNumber;

    if (Object.keys(req.params).length === 0) {
        responseMessages.ErrorCode412MissingValues(res);
    } else if (chassisNumber != null) {
        Car.findOne({ chassisNumber: chassisNumber }, function (err, docs) {
            if (err || !docs) {
                responseMessages.ErrorCode412MissingValues(res);
            } else {
                Car.deleteOne({ "chassisNumber": chassisNumber })
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