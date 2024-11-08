import { useState } from "react";
import { EditDataContext } from "../context";

export default function EditDataProvider({ children }) {
  const [editPost, setEditPost] = useState("");
  return (
    <EditDataContext.Provider value={{ editPost, setEditPost }}>
      {children}
    </EditDataContext.Provider>
  );
}
