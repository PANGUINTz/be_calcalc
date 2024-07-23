import mongoose from "mongoose";

const FoodIngredientSchema = new mongoose.Schema({
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "foods",
  },
  ingredient: [
    {
      ingredientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ingredients",
      },
      qty: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const FoodIngredientModel =
  mongoose.models.foodingredients ||
  mongoose.model("foodingredients", FoodIngredientSchema);

export default FoodIngredientModel;

export const getFoodIngredientAll = () =>
  FoodIngredientModel.find()
    .populate("foodId")
    .populate({ path: "ingredient.ingredientId" });

export const getFoodIngredByFoodId = (id) =>
  FoodIngredientModel.find({ foodId: id })
    .populate("foodId")
    .populate({ path: "ingredient.ingredientId" });

export const getFoodIngredByIngredId = (id) =>
  FoodIngredientModel.find({ "ingredient.ingredientId": id })
    .populate("foodId")
    .populate({ path: "ingredient.ingredientId" });

export const createFoodIngredient = (values) =>
  new FoodIngredientModel(values)
    .save()
    .then((foodingred) => foodingred.toObject());

export const updateFoodIngredient = (id, values) =>
  FoodIngredientModel.updateOne(
    { _id: id },
    {
      $addToSet: {
        ingredient: {
          ingredientId: values.ingredientId,
          qty: values.qty,
        },
      },
    },
    { upsert: true }
  );

export const deleteFoodIngredByFoodId = (id) =>
  FoodIngredientModel.findOneAndDelete({ foodId: id });

export const deleteFoodIngredByIngredId = (id) =>
  //findOneAndUpdate
  FoodIngredientModel.updateMany(
    {},
    { $pull: { ingredient: { ingredientId: id } } },
    { new: true }
  );
