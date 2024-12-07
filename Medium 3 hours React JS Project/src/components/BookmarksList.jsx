import React, { useEffect } from "react";
import { useBookmark } from "../context/BookmarkContext";
import "../App.css";

const BookmarkList = () => {
  const { bookmarks, openModal, deleteBookmark } = useBookmark();

  return (
    <div>
      <div id="heading">
        <h1>Bookamark Website</h1>
        <button onClick={() => openModal()}>Add New Bookmark</button>
      </div>
      <ul>
        <h2>All Bookmarks</h2>
        {bookmarks.map((bookmark) => (
          <li key={bookmark.id} style={{ marginBottom: "10px" }}>
            <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
              {bookmark.title}
            </a>
            <button
              onClick={() => openModal(bookmark)}
              style={{ marginLeft: "10px" }}
            >
              Edit
            </button>
            <button
              onClick={() => deleteBookmark(bookmark.id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookmarkList;
