import {
  get,
  create,
  update,
  deleteById,
} from "../controller/IngredientCategoryController.js";

export default (router) => {
  router.get("/categoryingred", get);
  router.post("/categoryingred", create);
  router.put("/categoryingred/:id", update);
  router.delete("/categoryingred/:id", deleteById);
};
