import { RequestHandler } from "express";

import { Book } from "../models/books";
import { User } from "../models/user";

export const getUserBooks: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
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
//todo:: i need the user ID from the session
export const rentBook: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const result = await getAllUserBooks(parseInt(id));
  return res.status(200).json(result);
};
