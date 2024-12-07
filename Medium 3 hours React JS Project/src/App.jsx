import React from "react";
import { BookmarkProvider } from "./context/BookmarkContext";
import BookmarkList from "./components/BookmarksList";
import BookmarkModal from "./UI/BookmarkModal";

const App = () => {
  return (
    <BookmarkProvider>
      <BookmarkList />
      <BookmarkModal />
    </BookmarkProvider>
  );
};

export default App;
