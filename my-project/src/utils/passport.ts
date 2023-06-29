// passport.js

import { User } from "../models/user";

const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const initialize = passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "123456789", // secret-key
    },
    async (
      jwtPayload: User,
      done: (arg0: null, arg1: boolean | User) => any
    ) => {
      try {
        console.log("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*");

        const user = await User.findByPk(jwtPayload.id);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export default initialize;
