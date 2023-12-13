import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./Models/bookModel.js";

const app = express();

// Parse data so that it is understandable to JS
app.use(express.json());

// HTTP Route
app.get("/", (req, res) => {
  return res.status(205).send("Welcome to BookStore");
});

// Post method to add book details to Database
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(500).send({ message: "Send all the required Fields" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    res.status(200).send({ book: book });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

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
