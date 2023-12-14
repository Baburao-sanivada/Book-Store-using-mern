import { Router } from "express";
import { Book } from "../Models/bookModel.js";

const router = Router();

// Post method to add book details to Database
router.post("/", async (req, res) => {
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

// get data of all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.send({ data: books });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Get data of a book by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Update book by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(500)
        .send({ message: "Send all the required Fields", body: req.body });
    }
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      res.send(400).send({ message: "Book not found" });
    }
    res
      .status(200)
      .send({ message: `Book not found with the given id : ${id}` });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//delete book by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      res
        .send(400)
        .send({ message: `Book not found with the given id : ${id}` });
    }
    res.send({ message: "Book Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
