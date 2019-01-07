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
    const username = body.username;
    const email = body.email;
    const password = body.password;
    if (!username && !email && password) {
        responseMessages.ErrorCode412MissingValues(res);
        return;
    }
    User.createUser(username, email, password, res);
});

router.post("/login", (req, res) => {
    const username = body.username;
    const password = body.password;
    if (!username && !password) {
        responseMessages.ErrorCode412MissingValues(res);
        return;
    }
    User.login(username, password, res);
});

router.post("/user/changepassword", (req, res) => {
    const body = req.body;
    const password = body.password;
    const newPassword = body.newPassword;
    if (!password && !newPassword) {
        responseMessages.ErrorCode412MissingValues(res);
        return;
    }
    User.changePassword(req.user.username, password, newPassword, res);
});

router.delete("/user", (req, res) => {
    const body = req.body;
    const password = body.password;
    if (!password) {
        responseMessages.ErrorCode412MissingValues(res);
        return;
    }
    User.deleteUser(req.user.username, password, res);
});

module.exports = router;