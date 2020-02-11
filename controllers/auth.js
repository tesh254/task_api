const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const env = require("../env");

const api = express.Router();

api.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        return res.status(400).json(info);
      }

      req.login(user, { session: false }, async error => {
        /* istanbul ignore next */
        if (error) return res.status(400).json(error);

        let exp = Math.floor(Date.now() / 1000) + 60 * 60;

        const token = jwt.sign({
          exp: exp*24,
          data: user.phonenumber
        }, env.secretKey);

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
