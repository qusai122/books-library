import { RequestHandler } from "express";
import { Book } from "../models/books";

import { User } from "../models/user";

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    var users = await User.create({ ...req.body });
  } catch (e) {
    return res
      .status(400)
      .json({ message: "User cannot be created", erorr: e.errors[0].message });
  }

  return res
    .status(200)
    .json({ message: "User created successfully", data: users });
};

export const getUser: RequestHandler = async (req, res, next) => {
  const users: User[] = await User.findAll();
  return res.status(200).json(users);
};

async function getElementById(id: number) {
  return await User.findByPk(id);
}

export const getOneUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const result = await getElementById(parseInt(id));
  return res.status(200).json(result);
};

export const updateUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const result: any[] = await User.update({ ...req.body }, { where: { id } });
  if (result[0]) {
    return res.status(200).json({ ...req.body });
  }
  return res.status(400).json("the file wan't updated");
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const user = await getElementById(parseInt(id));

  if (!user)
    return res.status(404).json({ message: "there is no user with this id" });
  const affectedRows = await User.destroy({ where: { id: id } });
  res.status(200).json(affectedRows);
};

export async function getUserById(id: number) {
  const result = await getElementById(id);
  return result;
}
