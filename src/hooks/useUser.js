import useAuth from "./useAuth";
import useProfile from "./useProfile";

export default function useUser() {
  const { auth } = useAuth();
  const { state } = useProfile();

  const user = state?.user ?? auth?.user;
  return user;
}
