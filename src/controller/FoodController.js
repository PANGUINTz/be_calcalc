import {
  createFood,
  deleteFoodById,
  getAllFood,
  getFoodByName,
  getFoodBySlug,
  updateFood,
} from "../modelSchema/food.model.js";

import {
  createFoodIngredient,
  deleteFoodIngredByFoodId,
  updateFoodIngredient,
} from "../modelSchema/FoodIngredient.model.js";

import {
  createFoodBranch,
  deleteFoodBranchByFoodId,
  updateFoodBranch,
} from "../modelSchema/foodBranch.model.js";

import generateString from "../../utills/generateString.js";
import handleUpload from "../configs/uploadImage.js";

export async function get(req, res) {
  try {
    const foods = await getAllFood();
    return res.status(200).send(foods);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function create(req, res) {
  const { foodName, price, categoryId, ingredient, branchId } = req.body;
  try {
    if (!foodName || !price || !categoryId || !branchId) {
      return res
        .status(400)
        .send({ message: "Please provide complete information" });
    }

    const ingredientArr = JSON.parse(ingredient);

    if (ingredientArr.length < 1) {
      return res.send({ error: "Please Fill Ingredient" });
    }

    if (!req.file) {
      return res.send({
        status: false,
        message: "Please choose image your product",
      });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);

    const foodNameExist = await getFoodByName(foodName);
    if (foodNameExist) {
      return res.send({ status: false, message: "Food Name is Exist" });
    }

    // Create FoodMenu
    const food = await createFood({
      foodName,
      price,
      categoryId,
      image: cldRes.url,
      slug: generateString(24),
    });

    //Food Ingredient
    const foodIngred = await createFoodIngredient({
      foodId: food._id,
      ingredient: [],
    });

    if (foodIngred) {
      for (let i = 0; i < ingredientArr.length; i++) {
        if (ingredientArr[i].qty <= 0) {
          return res
            .status(400)
            .send({ status: false, message: "Quantity must be positive" });
        }
        await updateFoodIngredient(foodIngred._id, {
          ingredientId: ingredientArr[i].ingredientId,
          qty: ingredientArr[i].qty,
        });
      }
    }
    // Food Branch
    await createFoodBranch({
      foodId: food._id,
      branchId,
    });
    return res.status(200).send(food);
  } catch (error) {
    return res.sendStatus(400);
  }
}

//FoodIngred Error
export async function getOneBySlug(req, res) {
  const { slug } = req.params;
  try {
    const food = await getFoodBySlug({ slug });
    return res.status(200).send(food);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function updateById(req, res) {
  const { id } = req.params;
  const { foodName, price, category, ingredient, branchId, image } = req.body;
  try {
    if (!foodName || !price || !category || !branchId) {
      return res
        .status(400)
        .send({ status: false, message: "Please Fill Food" });
    }

    const ingredientArr = JSON.parse(ingredient);
    if (ingredientArr.length < 1) {
      return res.send({ error: "Please Fill Ingredient" });
    }

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await handleUpload(dataURI);
      //1:case new image
      await updateFood(id, {
        foodName,
        price,
        category,
        image: cldRes.url,
      });
    } else {
      //2: case old image
      await updateFood(id, {
        foodName,
        price,
        category,
        image: image,
      });
    }

    await deleteFoodIngredByFoodId(id);

    const foodingred = await createFoodIngredient({
      foodId: id,
      ingredient: [],
    });

    if (foodingred) {
      for (let i = 0; i < ingredientArr.length; i++) {
        await updateFoodIngredient(foodingred._id, {
          ingredientId: ingredientArr[i].ingredientId,
          qty: ingredientArr[i].qty,
        });
      }
    }

    await updateFoodBranch({ foodId: id }, { branchId: branchId });

    return res.status(200).send(foodingred);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function deleteById(req, res) {
  const { id } = req.params;
  try {
    const food = await deleteFoodById(id);
    await deleteFoodBranchByFoodId(id);
    await deleteFoodIngredByFoodId(id);
    return res.status(200).send(food);
  } catch (error) {
    return res.sendStatus(400);
  }
}
