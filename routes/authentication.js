const express = require("express");
const router = express.Router();
const auth = require('../src/authentication/authentication');
const responseMessages = require("../responseMessages");
const Isemail = require('isemail');
const User = require('../src/repositories/userRepo');

router.all(new RegExp("^(?!\/login$|\/register$).*"), (request, response, next) => {
    const token = request.header('X-Access-Token');
    auth.decodeToken(token, (error, payload) => {
        if (error) {
            responseMessages.ErrorCode401(res);
        } else {
            request.user = {username: payload.sub};
            next();
        }
    })
});

router.post("/register", (req, res) => {
    const body = req.body;
    if (!CheckObjects.isValidRegistration(body)) {
        responseMessages.ErrorCode412MissingValues(res);
        return;
    }

    // Get the users information to store in the database.
    const username = body.username;
    const email = body.email;
    const password = body.password;
    User.createUser(username, email, password, res);
});

router.post("/login", (req, res) => {
    const body = req.body;
    if (!CheckObjects.isValidLogin(body)) {
        responseMessages.ErrorCode412MissingValues(res);
        return;
    }
    // Get the username and password from the request.
    const username = body.username;
    const password = body.password;
    User.login(username, password, res);
});

router.post("/user/changepassword", (req, res) => {
    const body = req.body;

    if (!CheckObjects.isValidPasswordChange(body)) {
        responseMessages.ErrorCode412MissingValues(res);
        return;
    }
    const password = body.password;
    const newPassword = body.newPassword;
    User.changePassword(req.user.username, password, newPassword, res);
});

router.delete("/user", (req, res) => {
    const body = req.body;

    if (!CheckObjects.isValidDelete(body)) {
        responseMessages.ErrorCode412MissingValues(res);
        return;
    }
    const password = body.password;
    User.deleteUser(req.user.username, password, res);
});


class CheckObjects {
    // Returns true if the given object is a valid login
    static isValidLogin(object) {
        const tmp =
            object && typeof object == "object" &&
            object.username && typeof object.username == "string" &&
            object.password && typeof object.password == "string";
        console.log(`Is login valid: ${tmp == undefined ? false : tmp}`);
        return tmp == undefined ? false : tmp;
    }

    // Returns true if the given object is a valid register
    static isValidRegistration(object) {
        const tmp =
            object && typeof object == "object" &&
            object.username && typeof object.username == "string" && object.username.length >= 2 &&
            object.email && typeof object.email == "string" && Isemail.validate(object.email) &&
            object.password && typeof object.password == "string";
        console.log(`Is registration valid: ${tmp == undefined ? false : tmp}`);
        return tmp == undefined ? false : tmp;
    }

    static isValidPasswordChange(object) {
        const tmp =
            object && typeof object == "object" &&
            object.password && typeof object.password == "string" &&
            object.newPassword && typeof object.newPassword == "string";
        console.log(`Is password change valid: ${tmp == undefined ? false : tmp}`);
        return tmp == undefined ? false : tmp;
    }

    static isValidDelete(object) {
        const tmp =
            object && typeof object == "object" &&
            object.password && typeof object.password == "string";
        console.log(`Is account delete valid: ${tmp == undefined ? false : tmp}`);
        return tmp == undefined ? false : tmp;
    }
}

module.exports = router;