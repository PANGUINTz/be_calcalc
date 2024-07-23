import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import cors from "cors";

import connectDB from "./src/configs/db.config.js";

import router from "./src/router/index.js";

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

env.config();

app.use("/public", express.static("public"));

app.use("/", router());

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
