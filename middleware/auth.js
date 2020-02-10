const jwt = require("jsonwebtoken");
const passport = require("passport");
const env = require("../env");
const db = require("../database/models");

exports.login = async (req, res, next) => {
  await passport.authenticate("login", { session: false }, function(
    err,
    user,
    response
  ) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return next({ message: "User not found" });
    }

    req.logIn(user, { session: false }, async err => {
      db.User.findAll({
        limit: 1,
        where: {
          phonenumber: user.phonenumber
        }
      }).then(user => {
        if (err) {
          next(err);
        }

        // Generate token after success login
        const loginToken = jwt.sign({
            phonenumber: user.phonenumber
        }, env.secretKey);
        next({ ...response, token: loginToken })
      });
    })(req, res, next);
  });
};
