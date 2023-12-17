import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
// import { MdOutlineAddBox } from "react-icons/md";
// import { MdOutlineAddBox } from "react-icons/md";

const Home = () => {
  const [isLoading, SetLoading] = useState(true);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    SetLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data);
        console.log(response.data);
        SetLoading(false);
      })
      .catch((error) => {
        console.log(error);
        SetLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-400 text-4xl" />
        </Link>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Author
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Publish Year
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Operations
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
