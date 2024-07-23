import {
  createIngredient,
  deleteIngredientById,
  getAllIngredient,
  getIngredientByName,
  getIngredientBySlug,
  updateIngredientBySlug,
} from "../modelSchema/ingredient.model.js";

import { deleteFoodIngredByIngredId } from "../modelSchema/FoodIngredient.model.js";

import generateString from "../../utills/generateString.js";

export async function get(req, res) {
  try {
    const ingredients = await getAllIngredient();
    return res.status(200).send(ingredients);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function create(req, res) {
  const {
    ingredientName,
    fat,
    carbohydrate,
    protein,
    fiber,
    sodium,
    calcium,
    potassium,
    ingredientCategoryId,
  } = req.body;
  try {
    if (!ingredientName || !ingredientCategoryId) {
      return res.status(400).send({
        status: false,
        message: "Please provide complete information",
      });
    }

    const ingredientExist = await getIngredientByName(ingredientName);
    if (ingredientExist) {
      return res
        .status(400)
        .send({ status: false, message: "Ingredient already exists" });
    }
    const ingredient = await createIngredient({
      ingredientName,
      fat: parseFloat(fat) || 0,
      carbohydrate: parseFloat(carbohydrate) || 0,
      protein: parseFloat(protein) || 0,
      fiber: parseFloat(fiber) || 0,
      sodium: parseFloat(sodium) || 0,
      calcium: parseFloat(calcium) || 0,
      potassium: parseFloat(potassium) || 0,
      ingredientCategoryId,
      slug: generateString(24),
    });

    return res.status(201).send(ingredient);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function getOneBySlug(req, res) {
  const { slug } = req.params;
  try {
    const ingredient = await getIngredientBySlug(slug);
    return res.status(200).send(ingredient);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function updateBySlug(req, res) {
  const { slug } = req.params;
  const {
    ingredientName,
    fat,
    carbohydrate,
    protein,
    fiber,
    sodium,
    calcium,
    potassium,
    ingredientCategoryId,
  } = req.body;

  const ingredientExist = await getIngredientByName(ingredientName);

  if (ingredientExist) {
    return res
      .status(400)
      .send({ status: false, message: "Ingredient already exists" });
  }
  try {
    const ingredient = await updateIngredientBySlug(
      { slug },
      {
        ingredientName,
        fat,
        carbohydrate,
        protein,
        fiber,
        sodium,
        calcium,
        potassium,
        ingredientCategoryId,
      }
    );
    return res.status(200).send(ingredient);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export async function deleteById(req, res) {
  const { id } = req.params;
  try {
    const ingredient = await deleteIngredientById(id);
    await deleteFoodIngredByIngredId(id);
    return res.status(200).send(ingredient);
  } catch (error) {
    return res.sendStatus(400);
  }
}
