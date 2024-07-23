import mongoose from "mongoose";

const categoryIngredientSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
  },
});

const categoryIngredientsModel =
  mongoose.models.categoryIngredients ||
  mongoose.model("categoryIngredients", categoryIngredientSchema);

export default categoryIngredientsModel;

export const getCategoryAll = () => categoryIngredientsModel.find();

export const getCategoryById = (id) => categoryIngredientsModel.findById(id);

export const getCategoryByName = (categoryName) =>
  categoryIngredientsModel.findOne({ categoryName });

export const createCategory = (values) =>
  new categoryIngredientsModel(values)
    .save()
    .then((category) => category.toObject());

export const updateCategoryNameById = (id, categoryName) =>
  categoryIngredientsModel.findByIdAndUpdate(id, { categoryName });

export const deleteCategory = (id) =>
  categoryIngredientsModel.findByIdAndDelete(id);
