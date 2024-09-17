import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { useTitle } from "../hooks/useTitle";

export const PageNotFound = () => {
  useTitle("Page Not Found");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <section className="flex flex-col items-center justify-center px-4 py-12 space-y-8 animate-fadeIn">
        {/* Error Message */}
        <p className="text-6xl font-extrabold text-gray-800 shadow-lg dark:text-white shadow-gray-300 dark:shadow-none">
          404, Oops!
        </p>

        {/* Logo */}
        <div className="w-48 h-48 md:w-64 md:h-64">
          <img
            className="object-cover w-full h-full rounded-lg shadow-lg"
            src={Logo}
            alt="Page not found"
          />
        </div>

        {/* Back to Home Button */}
        <div className="mt-6">
          <Link to="/">
            <button
              type="button"
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-white transition-transform transform rounded-full shadow-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-800"
            >
              Back To Home
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};
