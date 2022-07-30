/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { search, update } from "../../BooksAPI";
import BOOKS_SHELVES from "../../constants";

function Search({ showSearchPage, setShowSearchPage, onChangeStatus, books }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const { CURRENTLY_READING, READ, NONE, WANT_TO_READ } = BOOKS_SHELVES;

    const isObject = (obj) => {
        return obj && typeof obj === "object" && !Array.isArray(obj);
    };

    const handleCheckSearchQuery = () => {
        if (searchQuery.length > 0) {
            search(searchQuery, 10)
                .then((results) => {
                    if (isObject(results)) {
                        setSearchResults([]);
                    } else {
                        // remove books that are already on a shelf
                        const filteredResults = results.filter((book) => {
                            return !books.all.find((b) => b.id === book.id);
                        });
                        setSearchResults(filteredResults);
                    }
                })
                .catch((err) => {
                    console.log("From Search API", err);
                });
        } else {
            setSearchResults([]);
        }
    };

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
        handleCheckSearchQuery();
    };

    useEffect(() => {
        console.log("SEARCH RESULTS", searchQuery.length);
    }, [searchQuery.length]);

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <a
                    className="close-search"
                    onClick={() => setShowSearchPage(!showSearchPage)}
                >
                    Close
                </a>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onChange={handleChange}
                        value={searchQuery}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {searchResults.map((book) => (
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
                                            <option value="add">Add to...</option>
                                            <option value={CURRENTLY_READING}>
                                                Currently Reading
                                            </option>
                                            <option value={WANT_TO_READ}>Want to Read</option>
                                            <option value={READ}>Read</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors}</div>
                            </div>
                        </li>
                    ))}

                    {searchResults.length > 0 &&
                        searchQuery.length > 0 &&
                        books.all.map((book) => (
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
    );
}

export default Search;
