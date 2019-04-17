const config = require('../../config');
const moment = require('moment');
const jwt = require('jwt-simple');


// Encode (username to token)
function encodeToken(username) {
    const payload = {
        exp: moment().add(10, 'days').unix(),
        iat: moment().unix(),
        sub: username
    };
    return jwt.encode(payload, config.secretKey, null, null);
}


// Decode (token to username)
function decodeToken(token, cb) {
    try {
        const payload = jwt.decode(token, config.secretKey, null, null);
        // Return
        cb(null, payload);
    } catch(err) { cb(err, null);}
}

module.exports = {
    encodeToken,
    decodeToken
};