import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useBookmark } from "../context/BookmarkContext";
import styles from "./Bookmarks.module.css";

const BookmarkModal = () => {
  const {
    isModalOpen,
    currentBookmark,
    closeModal,
    addBookmark,
    updateBookmark,
  } = useBookmark();
  const [formData, setFormData] = useState({ title: "", url: "" });

  useEffect(() => {
    if (currentBookmark) {
      setFormData(currentBookmark); // Backfill data for editing
    } else {
      setFormData({ title: "", url: "" }); // Reset for new entry
    }
  }, [currentBookmark]);

  if (!isModalOpen) return null;

  const handleSubmit = () => {
    if (currentBookmark) {
      updateBookmark({ ...formData, _id: currentBookmark._id });
    } else {
      addBookmark({ ...formData, id: Date.now() });
      setFormData({ title: "", url: "" });
    }
    closeModal();
  };

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{currentBookmark ? "Edit Bookmark" : "Add Bookmark"}</h2>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="url"
          placeholder="URL"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
        />
        <button onClick={handleSubmit}>
          {currentBookmark ? "Update" : "Add"}
        </button>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default BookmarkModal;
