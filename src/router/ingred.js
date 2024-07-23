import {
  get,
  create,
  getOneBySlug,
  updateBySlug,
  deleteById,
} from "../controller/IngredientController.js";
import verifyToken from "../../middlewares/auth.js";

export default (router) => {
  router.get("/ingredient", get);
  router.post("/ingredient", create);
  router.get("/ingredient/:slug", getOneBySlug);
  router.put("/ingredient/:slug", updateBySlug);
  router.delete("/ingredient/:id", deleteById);
};
