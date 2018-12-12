const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
    if (process.env.NODE_ENV === 'testCloud' || process.env.NODE_ENV === 'production') {
        mongoose.connect('mongodb+srv://DbAdmin:Secret123!@clusterrickv-jzsrk.mongodb.net/test?retryWrites=true',
            {useNewUrlParser: true})
            .then(() => {
                console.log("MongoDB Cloud connected")
            })
            .catch(err => console.log(err));
    }
    else if (process.env.NODE_ENV === 'test') {
        mongoose.connect('mongodb://localhost/users',
            {useNewUrlParser: true})
            .then(() => {
                console.log("MongoDB Local connected")
            })
            .catch(err => console.log(err));
    }
    mongoose.connection
        .once('open', () => { done(); })
        .on('error', (error) => {
            console.warn('Warning', error);
        });
});

beforeEach((done) => {
    mongoose.connection.collections.cars.drop(() => {
        mongoose.connection.collections.employees.drop(() => {
            done();
        });
    });
});