import React, { useEffect, useRef, useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [isLoading, SetLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    SetLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        SetLoading(false);
      })
      .catch((error) => {
        console.log("some error occured");
        console.log(error);
      });
  }, []);
  const handleEditBook = async () => {
    const data = {
      title,
      author,
      publishYear,
    };
    console.log(data);
    SetLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then((response) => {
        console.log(response);
        SetLoading(false);
        navigate("/");
      })
      .catch((error) => {
        SetLoading(false);
        console.log(error);
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
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          ></input>
        </div>
        <div className="my-6 ">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          ></input>
        </div>
        <div className="my-6 ">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="text"
            onChange={(e) => setPublishYear(e.target.value)}
            value={publishYear}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          ></input>
        </div>
        <button className="p-2 bg-sky-800 m-8" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
