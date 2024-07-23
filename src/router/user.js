import {
  get,
  getOneBySlug,
  updatePassword,
  updateProfileById,
} from "../controller/UserController.js";

export default (router) => {
  router.get("/account", get);
  router.get("/account/:slug", getOneBySlug);
  router.put("/account/:id", updateProfileById);
  router.put("/account/:id/change-password", updatePassword);
};
