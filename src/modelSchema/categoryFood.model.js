import mongoose from "mongoose";

const CategoryFoodSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
  },
});

const CategoryFoodsModel =
  mongoose.models.categoryFoods ||
  mongoose.model("categoryFoods", CategoryFoodSchema);

export default CategoryFoodsModel;

export const getCategoryFood = () => CategoryFoodsModel.find();

export const getCategoryById = (id) => CategoryFoodsModel.findById(id);

export const getCategoryByName = (categoryName) =>
  CategoryFoodsModel.findOne({ categoryName });

export const createCategory = (values) =>
  new CategoryFoodsModel(values).save().then((category) => category.toObject());

export const updateCategoryFoodById = (id, categoryName) =>
  CategoryFoodsModel.findOneAndUpdate({ _id: id }, { categoryName });

export const deleteCategory = (id) => CategoryFoodsModel.findByIdAndDelete(id);
