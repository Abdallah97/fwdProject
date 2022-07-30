import React from "react";
import { update } from "../../BooksAPI";
import BOOKS_SHELVES from "../../constants";
const { CURRENTLY_READING, READ, NONE, WANT_TO_READ } = BOOKS_SHELVES;

function MainPage({
    setShowSearchPage,
    showSearchPage,
    books,
    setBooks,
    onChangeStatus,
}) {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books.currentlyReading.map((book) => (
                                    <li key={book.id}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div
                                                    className="book-cover"
                                                    style={{
                                                        width: 128,
                                                        height: 193,
                                                        backgroundImage: `url(${book.imageLinks.thumbnail})`,
                                                    }}
                                                ></div>
                                                <div className="book-shelf-changer">
                                                    <select
                                                        value={book.shelf}
                                                        onChange={(e) => {
                                                            update(book, e.target.value)
                                                                .then((updatedBook) => {
                                                                    onChangeStatus();
                                                                })
                                                                .catch((err) => {
                                                                    console.log("From Search API", err);
                                                                });
                                                        }}
                                                    >
                                                        <option value="move" disabled>
                                                            Move to...
                                                        </option>
                                                        <option value={CURRENTLY_READING}>
                                                            Currently Reading
                                                        </option>
                                                        <option value={WANT_TO_READ}>Want to Read</option>
                                                        <option value={READ}>Read</option>
                                                        <option value={NONE}>None</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="book-title">{book.title}</div>
                                            <div className="book-authors">{book.authors}</div>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books.wantToRead.map((book) => (
                                    <li key={book.id}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div
                                                    className="book-cover"
                                                    style={{
                                                        width: 128,
                                                        height: 193,
                                                        backgroundImage: `url(${book.imageLinks.thumbnail})`,
                                                    }}
                                                ></div>
                                                <div className="book-shelf-changer">
                                                    <select
                                                        value={book.shelf}
                                                        onChange={(e) => {
                                                            update(book, e.target.value)
                                                                .then((updatedBook) => {
                                                                    onChangeStatus();
                                                                })
                                                                .catch((err) => {
                                                                    console.log("From Search API", err);
                                                                });
                                                        }}
                                                    >
                                                        <option value="move" disabled>
                                                            Move to...
                                                        </option>
                                                        <option value={CURRENTLY_READING}>
                                                            Currently Reading
                                                        </option>
                                                        <option value={WANT_TO_READ}>Want to Read</option>
                                                        <option value={READ}>Read</option>
                                                        <option value={NONE}>None</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="book-title">{book.title}</div>
                                            <div className="book-authors">{book.authors}</div>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books.read.map((book) => (
                                    <li key={book.id}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div
                                                    className="book-cover"
                                                    style={{
                                                        width: 128,
                                                        height: 193,
                                                        backgroundImage: `url(${book.imageLinks.thumbnail})`,
                                                    }}
                                                ></div>
                                                <div className="book-shelf-changer">
                                                    <select
                                                        value={book.shelf}
                                                        onChange={(e) => {
                                                            update(book, e.target.value)
                                                                .then((updatedBook) => {
                                                                    onChangeStatus();
                                                                })
                                                                .catch((err) => {
                                                                    console.log("From Search API", err);
                                                                });
                                                        }}
                                                    >
                                                        <option value="move" disabled>
                                                            Move to...
                                                        </option>
                                                        <option value={CURRENTLY_READING}>
                                                            Currently Reading
                                                        </option>
                                                        <option value={WANT_TO_READ}>Want to Read</option>
                                                        <option value={READ}>Read</option>
                                                        <option value={NONE}>None</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="book-title">{book.title}</div>
                                            <div className="book-authors">{book.authors}</div>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="open-search">
                <a onClick={() => setShowSearchPage(!showSearchPage)}>Add a book</a>
            </div>
        </div>
    );
}

export default MainPage;
