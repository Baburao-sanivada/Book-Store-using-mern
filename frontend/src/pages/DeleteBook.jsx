import React, { useEffect, useRef, useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBook = () => {
  const [isLoading, SetLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteBook = () => {
    SetLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then((response) => {
        SetLoading(false);
        console.log("Book deleted Successfully");
        navigate("/");
      })
      .catch((error) => {
        SetLoading(false);
        alert("Some Error Occured");
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {isLoading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 w-[600px] mx-auto p-8 rounded-xl items-center">
        <h3 className="text-2xl">Are You Sure You Want to Delete This Book?</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Yes, Delete It
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
