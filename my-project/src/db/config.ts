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

export default connection;
