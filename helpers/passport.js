const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const JWTStategy = require("passport-jwt").Strategy
const ExtractJWT = require("passport-jwt").ExtractJwt
const db =  require("../database/models")
const passwordHelpers = require("../helpers/bcrypt");
const env = require("../env")

passport.use('login', new localStrategy({
    usernameField: 'phonenumber',
    passwordField: 'password'
}, async (phonenumber, password, done) => {
    try {
        const user = await db.User.findOne({where: {
            phonenumber
        }})

        if (!user) {
            return done(null, false, {message: "User not found"})
        }

        const validate = await passwordHelpers.comparePasswordHash(user.password, password)

        if (!validate) {
            return done(null, false, {message: "Wrong password"})
        }

        return done(null, user, { message: "Logged in successfully"})
    }
    catch(error) {
        done(error)
    }
}))

passport.use(new JWTStategy({
    secretOrKey: env.secretKey,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
    try {
        return done(null, token.phonenumber)
    }
    catch(error) {
        done(error)
    }
}))

module.exports = passport