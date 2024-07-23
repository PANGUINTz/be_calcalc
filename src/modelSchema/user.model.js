import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    default: "STF", // STF || MNG || ADM
  },
  slug: {
    type: String,
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "branchs",
  },
});

const UserModel = mongoose.models.users || mongoose.model("users", userSchema);

export default UserModel;

export const getUser = () => UserModel.find();
export const getUserBySlug = (slug) => UserModel.findOne({ slug });
export const getUserByEmail = (email) => UserModel.findOne({ email });
export const getUserById = (id) => UserModel.findById(id);
export const createUser = (values) =>
  new UserModel(values).save().then((user) => user.toObject());
export const updateUserById = (id, values) =>
  UserModel.findByIdAndUpdate(id, values);
export const deleteUserById = (id) => UserModel.findByIdAndDelete(id);
