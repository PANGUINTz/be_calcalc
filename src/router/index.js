import express from "express";
import authentication from "./authentication.js";
import categoryfood from "./categoryfood.js";
import categoryingred from "./categoryingred.js";
import food from "./food.js";
import foodbranch from "./foodbranch.js";
import foodingred from "./foodingred.js";
import branch from "./branch.js";
import ingred from "./ingred.js";
import user from "./user.js";

const router = express.Router();

export default () => {
  authentication(router);
  branch(router);
  categoryfood(router);
  categoryingred(router);
  food(router);
  foodbranch(router);
  foodingred(router);
  ingred(router);
  user(router);
  return router;
};
