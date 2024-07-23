import { getFoodBranchs } from "../modelSchema/foodBranch.model.js";

export async function get(req, res) {
  try {
    const foodbranchs = await getFoodBranchs();
    return res.status(200).send(foodbranchs);
  } catch (error) {
    return res.statusStatus(400);
  }
}
