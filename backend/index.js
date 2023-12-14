import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./Models/bookModel.js";
import bookRouter from "./routes/bookRoutes.js";

const app = express();

// Parse data so that it is understandable to JS
app.use(express.json());

// HTTP Route
app.get("/", (req, res) => {
  return res.status(205).send("Welcome to BookStore");
});

// Handling all request related to books like middleware
app.use("/books", bookRouter);

// Connection to DB
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("MongoDB Connection Successful");
    app.listen(PORT, () => {
      console.log(`App is listening to port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
