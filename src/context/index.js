import { createContext } from "react";

const AuthContext = createContext();

const ProfileContext = createContext();
const PostContext = createContext();
const PostEntryContext = createContext();
const EditDataContext = createContext();

export {
  AuthContext,
  EditDataContext,
  PostContext,
  PostEntryContext,
  ProfileContext,
};
