import userModel, {
  createUser,
  getUserByEmail,
} from "../modelSchema/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateString from "../../utills/generateString.js";

export async function register(req, res) {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send({
        status: false,
        message: "Please provide complete information.",
      });
    }

    const emailExist = await getUserByEmail(email);

    if (emailExist) {
      return res
        .status(400)
        .send({ status: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const datas = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || "STF",
      slug: generateString(24),
    };

    const user = await createUser(datas);
    if (user) {
      return res.status(200).send(user);
    }
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res
        .status(401)
        .send({ status: false, message: "Email is not registered" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res
        .status(401)
        .send({ status: false, message: "Password is incorrect" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    if (user && matchPassword) {
      return res.status(200).send({ user, token });
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}
