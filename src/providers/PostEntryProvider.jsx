import { useState } from "react";
import { PostEntryContext } from "../context";

export default function PostEntryProvider({ children }) {
  const [showPostEntry, setShowPostEntry] = useState({
    state: false,
    isEdit: false,
  });
  return (
    <PostEntryContext.Provider value={{ showPostEntry, setShowPostEntry }}>
      {children}
    </PostEntryContext.Provider>
  );
}
