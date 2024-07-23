import mongoose from "mongoose";

const FoodBranchSchema = new mongoose.Schema({
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "foods",
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "branchs",
  },
});

const FoodBranchModel =
  mongoose.models.foodbranchs ||
  mongoose.model("foodbranchs", FoodBranchSchema);

export default FoodBranchModel;

export const getFoodBranchs = () => FoodBranchModel.find().populate("foodId");
export const getFoodBranchByFoodId = (id) =>
  FoodBranchModel.findOne({ foodId: id });

export const createFoodBranch = (values) =>
  new FoodBranchModel(values)
    .save()
    .then((foodbranch) => foodbranch.toObject());

export const updateFoodBranch = (id, values) =>
  FoodBranchModel.findOneAndUpdate(id, values);

export const deleteFoodBranchByFoodId = (id) =>
  FoodBranchModel.findOneAndDelete({ foodId: id });
export const deleteFoodBranchByBranchId = (id) =>
  FoodBranchModel.findOneAndDelete({ branchId: id });
