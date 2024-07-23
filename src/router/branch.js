import {
  get,
  getOneBySlug,
  create,
  updateBySlug,
  deleteById,
} from "../controller/BranchController.js";

export default (router) => {
  router.get("/branch", get);
  router.get("/branch/:slug", getOneBySlug);
  router.post("/branch", create);
  router.put("/branch/:slug", updateBySlug);
  router.delete("/branch/:id", deleteById);
};
