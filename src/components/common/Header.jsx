import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";
import Logout from "../auth/Logout";

export default function Header() {
  const { auth } = useAuth();
  const { state } = useProfile();

  const user = state?.user ?? auth?.user;

  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-3">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <Link to="/">
          <img
            className="max-w-[100px] rounded-full "
            src="./assets/images/logo.svg"
          />
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/" className="btn-primary">
            <img
              className="max-w-[20px]"
              src="./assets/icons/home.svg"
              alt="Home"
            />
            Home
          </Link>
          <button className="icon-btn">
            <img
              className="max-w-[20px]"
              src="./assets/icons/notification.svg"
              alt="Notification"
            />
          </button>
          <Logout />

          <Link to="/me">
            <button className="flex-center !ml-8 gap-3">
              <span className="text-base font-medium ">{user?.firstName}</span>

              <img
                className="w-10 h-10 rounded-full"
                src={
                  user.avatar
                    ? `${import.meta.env.VITE_SERVER_BASE_URL}/${user.avatar}`
                    : "/assets/icons/profile.jpg"
                }
                alt=""
              />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
