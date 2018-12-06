const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerScheme = new Schema({
    firstName: {
        type: String,
        required: [true, 'FirstName is required'],
    },
    lastName: {
        type: String,
        required: [true, 'LastName is required'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
    },
    street: {
        type: String,
        required: [true, 'Street is required'],
    },
    houseNumber: {
        type: Number,
        required: [true, 'HouseNumber is required'],
    },
    postalCode: {
        type: String,
        required: [true, 'PostalCode is required'],
    }
});

const CarSchema = new Schema({
    chassisNumber: {
        type: Number,
        required: [true, 'ChassisNumber is required'],
        unique: true
    },
    brand: {
        type: String,
        required: [true, 'Brand is required'],
    },
    fuelType: {
        type: String,
        required: [true, 'FuelType is required'],
    },
    typeCar: {
        type: String,
        required: [true, 'CarType is required'],
    },
    soldBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'employee'
    },
    ownedBy: {
        type: CustomerScheme
    }
});

const Car = mongoose.model('car', CarSchema);

module.exports = Car;