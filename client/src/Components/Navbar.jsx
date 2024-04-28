import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Components/Store/auth";
import Menu from "./Menu";

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
    <nav className="bg-transparent bg-opacity-80">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between py-3">
          <div
            className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-sm md:text-xl font-bold flex items-center"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <svg className="h-5 mr-2" alt="logo" viewBox="0 0 100 100">
              <path d="M100 34.2c-.4-2.6-3.3-4-5.3-5.3-3.6-2.4-7.1-4.7-10.7-7.1-8.5-5.7-17.1-11.4-25.6-17.1-2-1.3-4-2.7-6-4-1.4-1-3.3-1-4.8 0-5.7 3.8-11.5 7.7-17.2 11.5L5.2 29C3 30.4.1 31.8 0 34.8c-.1 3.3 0 6.7 0 10v16c0 2.9-.6 6.3 2.1 8.1 6.4 4.4 12.9 8.6 19.4 12.9 8 5.3 16 10.7 24 16 2.2 1.5 4.4 3.1 7.1 1.3 2.3-1.5 4.5-3 6.8-4.5 8.9-5.9 17.8-11.9 26.7-17.8l9.9-6.6c.6-.4 1.3-.8 1.9-1.3 1.4-1 2-2.4 2-4.1V37.3c.1-1.1.2-2.1.1-3.1 0-.1 0 .2 0 0zM54.3 12.3L88 34.8 73 44.9 54.3 32.4V12.3zm-8.6 0v20L27.1 44.8 12 34.8l33.7-22.5zM8.6 42.8L19.3 50 8.6 57.2V42.8zm37.1 44.9L12 65.2l15-10.1 18.6 12.5v20.1zM50 60.2L34.8 50 50 39.8 65.2 50 50 60.2zm4.3 27.5v-20l18.6-12.5 15 10.1-33.6 22.4zm37.1-30.5L80.7 50l10.8-7.2-.1 14.4z"></path>
            </svg>
            <Link to="/">EventEase</Link>
          </div>

          <div className="flex items-center flex-grow">
            <ul className="flex space-x-4 ml-auto">
              {isLoggedIn ? (
                <li className="flex items-center">
                  <p className="mr-2 font-bold">{userData.fullname}</p>
                  <button
                    className="calendarJoinButton | px-[1.375rem] py-[0.375rem] rounded-full border border-black text-sm font-medium text-[black] hover:text-white hover:border-none"
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
                      className="calendarJoinButton | px-[1.375rem] py-[0.375rem] rounded-full border border-black text-sm font-medium text-[#6F6F6F] hover:text-white hover:border-none"
                      onClick={() => navigate("/login")}
                    >
                      SignIn
                    </button>
                  </li>
                  <li>
                    <button
                      className="calendarJoinButton | px-[1.375rem] py-[0.375rem] rounded-full border border-black text-sm font-medium text-[#6F6F6F] hover:text-white hover:border-none"
                      onClick={() => navigate("/register")}
                    >
                      SignUp
                    </button>
                  </li>
                </>
              )}
            </ul>
            {isLoggedIn && userData.userType==='student' && <Menu />}
          </div>
        </div>
      </div>
    </nav>
  );
}
