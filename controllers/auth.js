const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const env = require("../env");

const api = express.Router();

api.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        return next(info);
      }

      req.login(user, { session: false }, async error => {
        /* istanbul ignore next */
        if (error) return next(error);

        const token = jwt.sign(user.phonenumber, env.secretKey, {
          expiresIn: "24h"
        });

        return res.json({
          reset_password: 0,
          accessToken: token,
          expires_in: "24h"
        });
      });
    } catch (error) {
      /* istanbul ignore next */
      return next(error);
    }
  })(req, res, next);
});

module.exports = api;
