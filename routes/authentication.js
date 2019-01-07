const express = require("express");
const router = express.Router();
const auth = require('../src/authentication/authentication');
const responseMessages = require("../responseMessages");
const Isemail = require('isemail');
const User = require('../src/repositories/userRepo');

router.all(new RegExp("^(?!\/login$|\/register$).*"), (req, res, next) => {
    const token = req.header('X-Access-Token');
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
    console.log(req.body);
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    // if (Object.keys(req.body).length === 0) {
    //     responseMessages.ErrorCode412MissingValues(res);
    // } else if (username != null && email != null && password != null) {
    //     const newUser = new User({
    //         username: username,
    //         email: email,
    //         password: password
    //     });
    //
    //     newUser.save()
    //         .then(() => {
    //             res.status(200).json({token: auth.encodeToken(username)})
    //         })
    //         .catch(err => {
    //             console.warn(err);
    //             responseMessages.ErrorCode409Duplicate(res);
    //         })
    // }
});

router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username && !password) {
        responseMessages.ErrorCode412MissingValues(res);
        return;
    }
    User.login(username, password, res);
});

router.post("/user/changepassword", (req, res) => {
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    if (!password && !newPassword) {
        responseMessages.ErrorCode412MissingValues(res);
        return;
    }
    User.changePassword(req.user.username, password, newPassword, res);
});

router.delete("/user", (req, res) => {
    const password = req.body.password;
    if (!password) {
        responseMessages.ErrorCode412MissingValues(res);
        return;
    }
    User.deleteUser(req.user.username, password, res);
});

module.exports = router;