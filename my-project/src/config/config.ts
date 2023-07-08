import { Sequelize } from "sequelize-typescript";
import { Book } from "../models/books";
import { User } from "../models/user";

const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "pass123",
  database: "books-schema",
  logging: false,
  models: [Book, User],
});

export const secret: string =
  "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4ODU0ODc5OCwiaWF0IjoxNjg4NTQ4Nzk4fQ.9om7b_Hp3om0nj6prWpmD0tq5nKN5CQ8xp46np2m2p";
export default connection;
