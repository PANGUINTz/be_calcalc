import { get } from "../controller/FoodBranchController.js";

export default (router) => {
  router.get("/foodbranch", get);
};
