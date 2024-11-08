import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import useAuth from "../hooks/useAuth";
import EditDataProvider from "../providers/EditDataProvider";
import PostEntryProvider from "../providers/PostEntryProvider";
import PostProvider from "../providers/PostProvider";
import ProfileProvider from "../providers/ProfileProvider";

export default function PrivateRoute() {
  const { auth } = useAuth();

  return (
    <>
      {auth.user ? (
        <>
          <EditDataProvider>
            <PostEntryProvider>
              <PostProvider>
                <ProfileProvider>
                  <Header />
                  <main className="mx-auto max-w-[1020px] py-8">
                    <div className="container">
                      <Outlet />
                    </div>
                  </main>
                </ProfileProvider>
              </PostProvider>
            </PostEntryProvider>
          </EditDataProvider>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
