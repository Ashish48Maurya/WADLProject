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
    <nav className="bg-white bg-opacity-80">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className=" text-neutral-900 font-bold text-lg">
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
          {
            isLoggedIn && userData.userType === 'student' && <ul className="md:flex hidden">
              <li className="md:mx-2"><Link to="/private/schedule" className=" text-neutral-900 font-seibold text-sm">
                Schedule
              </Link>
              </li>
              <li className="md:mx-2"><Link to="/private/seeAllForms" className=" text-neutral-900 font-seibold text-sm">
                AppliedEvents
              </Link></li>
              <li className="md:mx-2"><Link to="/private/form" className=" text-neutral-900 font-seibold text-sm">
                ApplyForEvent
              </Link></li>
            </ul>
          }
          <div className="hidden lg:block">
            <ul className="flex space-x-4">
              {isLoggedIn ? (
                <li className="flex items-center">
                  <p className="mr-2 font-bold">{userData.fullname}</p>
                  <button
                    className="calendarJoinButton | px-[1.375rem] py-[0.375rem] rounded-full border border-black text-sm font-medium text-[red] hover:text-white hover:border-none"
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
          </div>
          <div className="md:hidden text-4xl">
            <Link to="/">&#8801;</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
