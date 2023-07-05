import { User } from "../models/user";
import { decodeToken } from "../routes/auth";
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "123456789",
  algorithms: ["HS256"],
};

const Strategy = new JwtStrategy(options, async (req: any, done: any) => {
  await decodeToken("token", "123456789")
    .then((user) => {
      if (user.id) {
        req.body.id = user.id;
        return done(null, user.id);
      }
    })
    .catch((err) => {
      return done(err, null);
    });
});

module.exports = (passport: any) => {
  passport.use(Strategy);
};
