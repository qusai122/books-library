import express from "express";
import bookRoutes from "./routes/books";
import UserRoutes from "./routes/user";
import AuthRoutes from "./routes/auth";
import connection from "./config/config";
import schedule from "./routes/schedule";
import { json, urlencoded } from "body-parser";
import cron from "node-cron";

//import passport from "./utils/passport";
const passport = require("passport");
///const session = require("express-session");

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(passport.initialize());

require("./utils/passport");
app.use("/book", bookRoutes);
app.use("/", AuthRoutes);
app.use("/schedule", schedule);

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

cron.schedule(
  "* * * * *",
  () => {
    const date = new Date();
    console.log(
      `This task is running every minute - ${date.getHours()}:${date.getMinutes()}`
    );
  },
  {
    scheduled: true,
    timezone: "Asia/Jerusalem",
    name: "simple-task",
    recoverMissedExecutions: false,
  }
);
let str = "30 7 * * 1"; // to schedule at 7:30 on monday
