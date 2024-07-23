import express from "express";

import {
  get,
  create,
  getOneBySlug,
  updateById,
  deleteById,
} from "../controller/FoodController.js";

import multer from "multer";

import fs from "fs";

// let storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = `./public/uploads/foodImage`;
//     fs.mkdirSync(uploadDir, { recursive: true });
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const { foodName } = req.body;
//     cb(null, `${foodName}.jpg`);
//   },
// });

const storage = new multer.memoryStorage();

const upload = multer({ storage: storage });

export default (router) => {
  router.get("/food", get);
  router.post("/food", upload.single("image"), create);
  router.get("/food/:slug", getOneBySlug);
  router.put("/food/:id", upload.single("image"), updateById);
  router.delete("/food/:id", deleteById);
};
