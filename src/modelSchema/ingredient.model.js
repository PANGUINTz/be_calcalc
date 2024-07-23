import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  ingredientName: {
    type: String,
    required: true,
    unique: true,
  },
  fat: {
    type: String,
    default: 0,
  },
  carbohydrate: {
    type: String,
    default: 0,
  },
  protein: {
    type: String,
    default: 0,
  },
  fiber: {
    type: String,
    default: 0,
  },
  sodium: {
    type: String,
    default: 0,
  },
  calcium: {
    type: String,
    default: 0,
  },
  potassium: {
    type: String,
    default: 0,
  },
  ingredientCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categoryIngredients",
  },
  slug: {
    type: String,
  },
});

const IngredientModel =
  mongoose.models.ingredients ||
  mongoose.model("ingredients", ingredientSchema);

export default IngredientModel;

export const getAllIngredient = () => IngredientModel.find();
export const getIngredientByName = (ingredientName) =>
  IngredientModel.findOne({ ingredientName });
export const getIngredientBySlug = (slug) => IngredientModel.findOne({ slug });
export const createIngredient = (values) =>
  new IngredientModel(values)
    .save()
    .then((ingredient) => ingredient.toObject());
export const updateIngredientBySlug = (slug, values) =>
  IngredientModel.findOneAndUpdate(slug, values);
export const deleteIngredientById = (id) =>
  IngredientModel.findByIdAndDelete(id);
export const deleteIngredByCategoryId = (id) =>
  IngredientModel.deleteMany({ ingredientCategoryId: id });
