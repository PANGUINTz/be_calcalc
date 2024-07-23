import {
  deleteUserById,
  getUser,
  getUserById,
  getUserBySlug,
  updateUserById,
} from "../modelSchema/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function get(req, res) {
  try {
    const users = await getUser();
    return res.status(200).send(users);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function getOneBySlug(req, res) {
  try {
    const { slug } = req.params;
    const user = await getUserBySlug(slug);
    return res.status(200).send(user);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function updateProfileById(req, res) {
  try {
    const { profileImage } = req.body;
    const { id } = req.params;

    const updateUser = await updateUserById(id, profileImage);
    return res.status(200).send(updateUser);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function updatePassword(req, res) {
  console.log(req.body);
  const { password, newPassword } = req.body;
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    console.log(user);
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res
        .status(401)
        .send({ status: false, message: "current password is incorrect" });
    }
    if (matchPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const userUpdate = await updateUserById(id, { password: hashedPassword });
      if (userUpdate) {
        return res.status(200).send(userUpdate);
      }
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export async function deleteById(req, res) {
  try {
    const { id } = req.params;
    const deleteUser = await deleteUserById(id);
    return res.status(200).send(deleteUser);
  } catch (error) {
    return res.sendStatus(400);
  }
}
