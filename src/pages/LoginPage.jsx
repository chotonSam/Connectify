import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-deepDark py-8">
        <div className="max-w-[1368px] flex-1">
          <div className="container grid items-center gap-8 lg:grid-cols-2">
            <div>
              <img
                className="mb-12 sm:max-w-full  w-80"
                src="./assets/images/auth_illustration.png"
                alt="auth_illustration"
              />
              <div>
                <div>
                  <h1 class=" mb-3 text-4xl lg:text-[40px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                    Connectify
                  </h1>
                </div>
                <p className="max-w-[452px] text-gray-600/95 lg:text-lg">
                  Create a social media app with features like, showing the
                  post, post details, reactions, comments and profile.
                </p>
              </div>
            </div>

            <div className="card">
              <LoginForm />

              <div className="py-4 lg:py-6">
                <p className="text-center text-xs text-gray-600/95 lg:text-sm">
                  Don’t have account?
                  <Link
                    className="text-white transition-all hover:text-lwsGreen hover:underline"
                    to="/register"
                  >
                    Create New
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
