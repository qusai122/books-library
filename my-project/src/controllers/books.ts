import { RequestHandler, Request, Response } from "express";
import { Book } from "../models/books";

const jwt = require("jsonwebtoken");

export const createBook: RequestHandler = async (req, res, next) => {
  const books = await Book.create({ ...req.body });
  return res
    .status(200)
    .json({ message: "Book created successfully", data: books });
};

export const getBooks: RequestHandler = async (req, res, next) => {
  const { available } = req.query;
  let books: Book[];
  if (available === "1") {
    books = await Book.findAll({
      where: {
        userId: null,
      },
    });
  } else {
    books = await Book.findAll();
  }
  return res.status(200).json(books);
};

async function getElementById(id: number) {
  return await Book.findByPk(id);
}

export const getOneBook: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const result = await getElementById(parseInt(id));
  return res.status(200).json(result);
};

export const updateBook: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const result: any[] = await Book.update({ ...req.body }, { where: { id } });
  if (result[0]) {
    return res.status(200).json({ ...req.body });
  }
  return res.status(400).json({ message: "the file wasn't updated" });
};

export const deleteBook: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const book = await getElementById(parseInt(id));

  if (!book)
    return res.status(404).json({ message: "there is no book with this id" });
  const affectedRows = await Book.destroy({ where: { id: id } });
  res.status(200).json(affectedRows);
};
interface ResData {}

export const getUserBooks: RequestHandler = async (
  req: Request,
  res: Response<ResData>
) => {
  const id = req.user.dataValues.id;

  const result = await getAllUserBooks(parseInt(id));
  return res.status(200).json(result);
};

async function getAllUserBooks(id: number) {
  return await Book.findAll({
    where: {
      userId: id,
    },
  });
}
export const rentBook: RequestHandler = async (req: Request, res, next) => {
  const userId = req.user.dataValues.id;
  const bookId = req.params.id;

  const book = await getElementById(parseInt(bookId));
  if (book) {
    if (book.userId) {
      return res.status(400).json("book already rented");
    } else {
      book.userId = userId;
      console.log(book.dataValues);
      const result: any[] = await Book.update(book.dataValues, {
        where: { id: bookId },
      });
      if (result[0]) {
        return res.status(200).json({ ...book.dataValues });
      }
      return res.status(400).json({ message: "couldn't rent book" });
    }
  }
};

export const returnBook: RequestHandler = async (req: Request, res, next) => {
  const userId = req.user.dataValues.id;
  const bookId = req.params.id;

  const book = await getElementById(parseInt(bookId));
  if (book) {
    if (book.userId !== userId) {
      return res
        .status(403)
        .json({ message: "this book doesn't belong to the user" });
    } else {
      book.userId = null as any;
      console.log(book.dataValues);
      const result: any[] = await Book.update(book.dataValues, {
        where: { id: bookId },
      });
      if (result[0]) {
        return res.status(200).json({ ...book.dataValues });
      }
      return res.status(400).json({ message: "couldn't rent book" });
    }
  }
};
