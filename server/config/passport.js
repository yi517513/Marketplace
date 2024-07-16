const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// LocalStrategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const foundUser = await User.findOne({ email }).exec();
        if (!foundUser) {
          return done(null, false, { message: "信箱或密碼錯誤" });
        }
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) return done(null, false, { message: "信箱或密碼錯誤" });
        return done(null, foundUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// JwtStrategy
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.token;
    // console.log(token);
  }
  return token;
};

const opts = {
  // 從req.header中獲取token的方式改為從cookie
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.SECRET_KEY,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const foundUser = await User.findOne({ _id: jwt_payload.id }).exec();
      if (foundUser) {
        return done(null, foundUser);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport;
