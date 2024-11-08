import { Link } from "react-router-dom";
import RegistrationLogo from "../assets/icons/registration.svg";
import RegistrationForm from "../components/auth/RegistrationForm";

const RegistrationPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-deepDark py-8">
      <div className="max-w-[1368px] flex-1">
        <div className="container grid items-center gap-8 lg:grid-cols-2">
          <div>
            <img
              className="mb-12 h-60"
              src={RegistrationLogo}
              alt="auth_illustration"
            />
            <div>
              <h1 class=" mb-3 text-4xl lg:text-[40px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                Connectify
              </h1>
              <p className="max-w-[452px] text-gray-400/95 lg:text-lg">
                Create a social media app with features like, showing the post,
                post details, reactions, comments and profile.
              </p>
            </div>
          </div>
          <div className="card">
            <RegistrationForm />
            <div className="py-4 lg:py-4">
              <p className="text-center text-xs text-gray-600/95 lg:text-sm mx-2">
                Already have an account?
                <Link
                  className="mx-2 hover:text-lwsGreen text-white transition-all hover:underline"
                  to="/"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegistrationPage;
