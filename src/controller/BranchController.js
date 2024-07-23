import {
  createBranch,
  getBranchs,
  getBranchByName,
  getBranchBySlug,
  updateBranchBySlug,
  deleteBranchById,
} from "../modelSchema/branch.model.js";
import generateString from "../../utills/generateString.js";
import { deleteFoodBranchByBranchId } from "../modelSchema/foodBranch.model.js";
import { deleteFoodById } from "../modelSchema/food.model.js";
import { deleteFoodIngredByFoodId } from "../modelSchema/FoodIngredient.model.js";

export async function get(req, res) {
  try {
    const branchs = await getBranchs();
    return res.status(200).send(branchs);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function create(req, res) {
  const { branchName, address, tel } = req.body;
  try {
    if (!branchName) {
      return res.status(400).send({
        status: false,
        message: "Please provide complete information",
      });
    }

    const existBranch = await getBranchByName(branchName);
    if (existBranch) {
      return res
        .status(400)
        .send({ status: false, message: "Branch already exists" });
    }

    const branch = await createBranch({
      branchName,
      address,
      tel,
      slug: generateString(24),
    });
    if (branch) {
      return res.status(201).send(branch);
    }
    return res.sendStatus(400);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function getOneBySlug(req, res) {
  const { slug } = req.params;
  try {
    const branch = await getBranchBySlug(slug);
    return res.status(200).send(branch);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function updateBySlug(req, res) {
  const { slug } = req.params;
  const { branchName, address, tel } = req.body;
  try {
    const branch = await updateBranchBySlug(
      { slug },
      { branchName, address, tel }
    );
    return res.status(200).send(branch);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function deleteById(req, res) {
  const { id } = req.params;
  try {
    const branch = await deleteBranchById(id);
    await deleteFoodBranchByBranchId(id);
    //relate
    // const food = await deleteFoodById(foodbranch.foodId);
    // await deleteFoodIngredByFoodId(food._id);
    return res.status(200).send(branch);
  } catch (error) {
    return res.sendStatus(400);
  }
}
