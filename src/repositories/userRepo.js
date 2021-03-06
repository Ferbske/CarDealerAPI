const auth = require('../authentication/authentication');
const User = require('../user');
const responseMessages = require("../../responseMessages");

class UserRepository {
    static createUser(username, email, password, res) {
        User.findOne({username})
            .then((user) => {
                if (user === null) {
                    const newUser = new User({
                        username: username,
                        email: email,
                        password: password
                    });

                    const token = auth.encodeToken(username);

                    console.log(newUser);

                    newUser.save()
                        .then(() => {
                            responseMessages.Successcode201CreateUser(res, token);
                        })
                        .catch(err => {
                            console.warn(err);
                            responseMessages.ErrorCode409Duplicate(res);
                        })
                } else responseMessages.ErrorCode409Duplicate(res);
            })
            .catch(() =>
                responseMessages.Errorcode500(res)
            );
    };

    static login(username, password, res) {
        User.findOne({username})
            .then((user) => {
                if (user.password === password) res.status(200).json({token: auth.encodeToken(username)});
                else responseMessages.ErrorCode401(res);
            })
            .catch(() => {
                responseMessages.ErrorCode401(res)
            });

    };

    static changePassword(username, password, newPassword, res) {
        User.findOne({username})
            .then((user) => {
                console.log("User: " + user);
                if (user.password === password) {
                    user.set({password: newPassword});
                    user.save()
                        .then(() => res.status(200).json({message: "your password has been changed."}))
                        .catch(() => res.status(500).json(responseMessages.ErrorCode401(res)))
                } else res.status(401).json(responseMessages.ErrorCode401(res));
            })
            .catch(() => {
                res.status(404).json(responseMessages.ErrorCode422(res))
            });
    };

    static deleteUser(username, password, res) {
        User.findOneAndDelete({username, password})
            .then(() => {
                res.status(200).json({message: "the user has been deleted."});
            })
            .catch(() => {
                res.status(401).json(responseMessages.ErrorCode401(res))
            });
    };
}

module.exports = UserRepository;