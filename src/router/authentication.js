import { login, register } from "../controller/AuthenticationController.js";

export default (router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
};
