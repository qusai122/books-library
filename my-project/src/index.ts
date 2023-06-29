import express from "express";
import bookRoutes from "./routes/books";
import UserRoutes from "./routes/user";
import AuthRoutes from "./routes/auth";
import connection from "./db/config";
import { json, urlencoded } from "body-parser";
//import passport from "./utils/passport";
const passport = require("passport");

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(passport.initialize());
require("./utils/passport");
app.use("/book", bookRoutes);
app.use("/user", UserRoutes);
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
