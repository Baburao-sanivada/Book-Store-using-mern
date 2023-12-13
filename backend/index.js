import express from "express";
import { PORT } from "./config.js";

const app = express();

// HTTP Route
app.get("/", (req, res) => {
  return res.status(205).send("Welcome to BookStore");
});
app.listen(PORT, () => {
  console.log(`App is listening to port : ${PORT}`);
});
