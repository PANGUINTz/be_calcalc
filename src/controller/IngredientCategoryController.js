import { deleteFoodIngredByIngredId } from "../modelSchema/FoodIngredient.model.js";
import {
  getCategoryAll,
  getCategoryByName,
  createCategory,
  deleteCategory,
  updateCategoryNameById,
  getCategoryById,
} from "../modelSchema/categoryIngredient.model.js";
import { deleteIngredByCategoryId } from "../modelSchema/ingredient.model.js";

//Category Ingredient
export async function get(req, res) {
  try {
    const categories = await getCategoryAll();
    return res.status(200).send(categories);
  } catch (error) {
    return res.statusStatus(400);
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
    return res.status(201).send(category);
  } catch (error) {
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
    const category = await updateCategoryNameById(id, categoryName);
    return res.status(200).send(category);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export async function deleteById(req, res) {
  const { id } = req.params;
  try {
    const category = await deleteCategory(id);
    //relate
    // const ingred = await deleteIngredByCategoryId(id);
    // await deleteFoodIngredByIngredId(ingred._id);
    return res.status(200).send(category);
  } catch (error) {
    res.sendStatus(400);
  }
}
