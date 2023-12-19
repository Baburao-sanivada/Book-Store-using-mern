import React, { useRef, useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBooks = () => {
  const title = useRef("");
  const author = useRef("");
  const publishYear = useRef("");
  const [isLoading, SetLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleSaveBook = async () => {
    const data = {
      title: title.current.value,
      author: author.current.value,
      publishYear: publishYear.current.value,
    };
    console.log(data);
    SetLoading(true);
    axios
      .post("http://localhost:5555/books", data)
      .then((response) => {
        console.log(response);
        SetLoading(false);
        enqueueSnackbar("Book Created Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        SetLoading(false);
        console.log(error);
        enqueueSnackbar("Error", { variant: "error" });
        console.log("Some error occured while trying to post data");
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {isLoading ? <Spinner /> : ""}
      <div className="flex flex-col mx-auto border-2 border-sky-400 rounded-xl w-[600px] p-4">
        <div className="my-6 ">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            ref={title}
            // value={title.current}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          ></input>
        </div>
        <div className="my-6 ">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            ref={author}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          ></input>
        </div>
        <div className="my-6 ">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="text"
            ref={publishYear}
            // value={title.current}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          ></input>
        </div>
        <button className="p-2 bg-sky-800 m-8" onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
