import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [isLoading, SetLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    SetLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        console.log(response.data.data);
        SetLoading(false);
      })
      .catch((error) => {
        console.log(error);
        SetLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className={`${
            showType === "table" ? "bg-sky-300 hover:bg-sky-600" : ""
          } px-4 py-1 rounded-lg`}
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className={`${
            showType === "table" ? "" : "bg-sky-300 hover:bg-sky-600"
          } px-4 py-1 rounded-lg`}
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-400 text-4xl" />
        </Link>
      </div>
      {isLoading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
