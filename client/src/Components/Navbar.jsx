import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Components/Store/auth";

export default function Navbar() {
  const { isLoggedIn, LogoutUser } = useAuth();
  const data = localStorage.getItem("USER");
  const userData = JSON.parse(data);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomepage = location.pathname === "/";

  if (!isLoggedIn && !isHomepage) {
    return null;
  }

  return (
    <nav className="bg-opacity-80 bg-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-2">
          <Link to="/" className="text-black font-bold">
            AppName
          </Link>
          <button
            className="block lg:hidden px-2 text-gray-500 focus:outline-none"
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          <div className="hidden lg:block">
            <ul className="flex space-x-4">
              {isLoggedIn ? (
                <li className="flex items-center">
                  <p className="mr-2 font-bold">{userData.fullname}</p>
                  <button
                    className="text-red-500 font-bold"
                    onClick={() => {
                      LogoutUser();
                      navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <button
                      className="btn-signin"
                      onClick={() => navigate("/login")}
                    >
                      SignIn
                    </button>
                  </li>
                  <li>
                    <button
                      className="btn-signup"
                      onClick={() => navigate("/register")}
                    >
                      SignUp
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
