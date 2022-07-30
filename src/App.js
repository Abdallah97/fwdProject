import "./App.css";
import { useEffect, useState } from "react";
import { getAll } from "./BooksAPI";
import MainPage from "./components/MainPage";
import Search from "./components/Search";
import BOOKS_SHELVES from "./constants";

function App() {
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [books, setBooks] = useState({
    all: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
  });
  const { CURRENTLY_READING, READ, WANT_TO_READ } = BOOKS_SHELVES;

  const getAllBooks = () => {
    getAll().then((books) => {
      setBooks({
        all: books,
        currentlyReading: books.filter(
          (book) => book.shelf === CURRENTLY_READING
        ),
        wantToRead: books.filter((book) => book.shelf === WANT_TO_READ),
        read: books.filter((book) => book.shelf === READ),
      });
    });
  };
  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div className="app">
      {showSearchPage ? (
        <Search
          setShowSearchPage={setShowSearchPage}
          showSearchPage={showSearchPage}
          onChangeStatus={getAllBooks}
          books={books}
        />
      ) : (
        <MainPage
          setShowSearchPage={setShowSearchPage}
          showSearchPage={showSearchPage}
          books={books}
          setBooks={setBooks}
          onChangeStatus={getAllBooks}
        />
      )}
    </div>
  );
}

export default App;
