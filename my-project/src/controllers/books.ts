import { RequestHandler } from "express";

import { Book } from "../models/books";

export const createBook: RequestHandler = async (req, res, next) => {
  var books = await Book.create({ ...req.body });
  return res
    .status(200)
    .json({ message: "Book created successfully", data: books });
};

export const getBook: RequestHandler = async (req, res, next) => {
  const books: Book[] = await Book.findAll();
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
  return res.status(400).json("the file wan't updated");
};

export const deleteBook: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const book = await getElementById(parseInt(id));

  if (!book)
    return res.status(404).json({ message: "there is no book with this id" });
  const affectedRows = await Book.destroy({ where: { id: id } });
  res.status(200).json(affectedRows);
};
