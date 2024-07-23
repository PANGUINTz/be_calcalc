import {
  get,
  create,
  deleteById,
  update,
} from "../controller/FoodCategoryController.js";

export default (router) => {
  router.get("/categoryfood", get);
  router.post("/categoryfood", create);
  router.put("/categoryfood/:id", update);
  router.delete("/categoryfood/:id", deleteById);
};
