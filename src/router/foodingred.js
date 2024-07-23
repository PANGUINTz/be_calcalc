import { get, getOneById } from "../controller/FoodIngredientController.js";

export default (router) => {
  router.get("/foodingred", get);
  router.get("/foodingred/:id", getOneById);
};
