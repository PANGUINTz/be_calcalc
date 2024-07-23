import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
  branchName: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  tel: {
    type: String,
  },
  slug: {
    type: String,
  },
});

const BranchModel =
  mongoose.models.branchs || mongoose.model("branchs", branchSchema);

export default BranchModel;

export const getBranchs = () => BranchModel.find();
export const getBranchBySlug = (slug) => BranchModel.findOne({ slug });
export const getBranchByName = (branchName) =>
  BranchModel.findOne({ branchName });

export const createBranch = (values) =>
  new BranchModel(values).save().then((branch) => branch.toObject());

export const updateBranchBySlug = (slug, values) =>
  BranchModel.findOneAndUpdate(slug, values);

export const deleteBranchById = (id) => BranchModel.findByIdAndDelete(id);
