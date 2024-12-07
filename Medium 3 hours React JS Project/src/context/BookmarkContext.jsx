import { createContext, useState, useContext, useEffect } from "react";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentBookmark, setCurrentBookmark] = useState(null);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const openModal = (bookmark = null) => {
    setCurrentBookmark(bookmark);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentBookmark(null);
  };

  const addBookmark = (newBookmark) => {
    setBookmarks([...bookmarks, newBookmark]);
  };

  const updateBookmark = (updatedBookmark) => {
    setBookmarks(
      bookmarks.map((bookmark) =>
        bookmark.id === updatedBookmark.id ? updatedBookmark : bookmark
      )
    );
  };

  const deleteBookmark = (id) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isModalOpen,
        currentBookmark,
        openModal,
        closeModal,
        addBookmark,
        updateBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmark = () => useContext(BookmarkContext);
