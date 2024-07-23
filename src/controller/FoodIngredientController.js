import {
  getFoodIngredientAll,
  getFoodIngredByFoodId,
} from "../modelSchema/FoodIngredient.model.js";
import { getFoodBranchByFoodId } from "../modelSchema/foodBranch.model.js";

export async function get(req, res) {
  try {
    const foodingreds = await getFoodIngredientAll();
    return res.status(200).send(foodingreds);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function getOneById(req, res) {
  const { id } = req.params;
  try {
    const foodingred = await getFoodIngredByFoodId(id);
    const branch = await getFoodBranchByFoodId(id);
    const newData = { ...foodingred, 1: branch };
    return res.status(200).send(newData);
  } catch (error) {
    return res.sendStatus(400);
  }
}
