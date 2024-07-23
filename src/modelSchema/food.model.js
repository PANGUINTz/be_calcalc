import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categoryFoods",
  },
  slug: {
    type: String,
  },
  image: {
    type: String,
  },
});

const FoodModel = mongoose.models.foods || mongoose.model("foods", foodSchema);

export default FoodModel;

export const getAllFood = () => FoodModel.find();
export const getFoodById = (id) => FoodModel.findOne(id);
export const getFoodByName = (foodName) => FoodModel.findOne({ foodName });
export const getFoodBySlug = (slug) => FoodModel.findOne({ slug });

export const createFood = (values) =>
  new FoodModel(values).save().then((food) => food.toObject());

export const updateFood = (id, values) =>
  FoodModel.findByIdAndUpdate(id, values);

export const deleteFoodById = (id) => FoodModel.findByIdAndDelete(id);
export const deleteFoodByCateId = (id) =>
  FoodModel.findOneAndDelete({ categoryId: id });
