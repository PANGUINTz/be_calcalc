import { deleteFoodIngredByFoodId } from "../modelSchema/FoodIngredient.model.js";
import {
  getCategoryFood,
  getCategoryByName,
  createCategory,
  deleteCategory,
  updateCategoryFoodById,
  getCategoryById,
} from "../modelSchema/categoryFood.model.js";

import { deleteFoodByCateId } from "../modelSchema/food.model.js";
import { deleteFoodBranchByFoodId } from "../modelSchema/foodBranch.model.js";

export async function get(req, res) {
  try {
    const categories = await getCategoryFood();
    return res.status(200).send(categories);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function create(req, res) {
  const { categoryName } = req.body;
  try {
    const categoryExist = await getCategoryByName(categoryName);
    if (categoryExist) {
      return res
        .status(400)
        .send({ status: false, message: "Category already exists" });
    }
    const category = await createCategory({ categoryName });
    return res.status(200).send(category);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export async function update(req, res) {
  const { id } = req.params;
  const { categoryName } = req.body;
  try {
    if (categoryName == "")
      return res
        .status(400)
        .send({ status: false, message: "category is empty" });
    const findCategory = await getCategoryById(id);
    if (!findCategory) {
      return res
        .status(400)
        .send({ status: false, message: "category not found" });
    }
    const categoryExist = await getCategoryByName(categoryName);
    if (categoryExist) {
      return res
        .status(400)
        .send({ status: false, message: "Category already exists" });
    }

    const category = await updateCategoryFoodById(id, categoryName);
    return res.status(200).send(category);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function deleteById(req, res) {
  const { id } = req.params;
  try {
    const category = await deleteCategory(id);
    //relate
    // const food = await deleteFoodByCateId(id);
    // await deleteFoodBranchByFoodId(food._id);
    // await deleteFoodIngredByFoodId(food._id);
    return res.status(200).send(category);
  } catch (error) {
    return res.sendStatus(400);
  }
}
