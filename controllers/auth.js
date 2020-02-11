const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const env = require("../env");

const api = express.Router();

api.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("User was not found");
        return next(error);
      }

      req.login(user, { session: false }, async error => {
        /* istanbul ignore next */
        if (error) return next(error);

        const token = jwt.sign(user.phonenumber, env.secretKey);

        return res.json({ token });
      });
    } catch (error) {
      /* istanbul ignore next */
      return next(error);
    }
  })(req, res, next)
});

module.exports = api;
