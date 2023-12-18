import Card from "./Card";

const BooksCard = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <Card book={book} key={book._id} />
      ))}
    </div>
  );
};

export default BooksCard;
