import express from "express";
import bookRoutes from "./routes/books";
import UserRoutes from "./routes/user";
import RentRoutes from "./routes/rent";
import AuthRoutes from "./routes/auth";
import connection from "./db/config";
import { json, urlencoded } from "body-parser";
import { User } from "./models/user";
import { getUserById } from "./controllers/user";
var morgan = require("morgan");
const passport = require("passport");
//const LocalStrategy = require("passport-local");
//const session = require("express-session");
//const FileStore = require("session-file-store");

const app = express();

//TODO::
/*app.use(
  session({
    store: new FileStore(),
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);*/
app.use(passport.initialize());

//TODO::
//app.use(passport.session());

app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/book", bookRoutes);
app.use("/user", UserRoutes);
app.use("/rent", RentRoutes);
app.use("/auth", AuthRoutes);
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

passport.serializeUser((user: User, done: any) => {
  done(null, user.id);
});
passport.deserializeUser((id: number, done: any) => {
  const _user = getUserById(id);
});
//TODO::
/*passport.use(
  new LocalStrategy(
    {
      email: "email",
    },
    (email: String, password: String, done: any) => {}
  )
);*/

connection
  .sync()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
