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
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between py-3">
          <div
            className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-sm md:text-xl font-bold flex items-center"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0,0,256,256"
              className="fill:#000000;"
            >
              <g
                fill="none"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
                className="mix-blend-mode: normal"
              >
                <g transform="scale(5.33333,5.33333)">
                  <path
                    d="M37,36h-20c-2.761,0 -5,-2.239 -5,-5v-20c0,-2.761 2.239,-5 5,-5h20c2.761,0 5,2.239 5,5v20c0,2.761 -2.239,5 -5,5zM21,30h14v-11.5c0,-3.038 -2.462,-5.5 -5.5,-5.5h-11.5v14c0,1.657 1.343,3 3,3z"
                    fill="#64b5f6"
                  ></path>
                  <path
                    d="M31,42h-20c-2.761,0 -5,-2.239 -5,-5v-20c0,-2.761 2.239,-5 5,-5h20c2.761,0 5,2.239 5,5v20c0,2.761 -2.239,5 -5,5zM17.5,36h12.5v-15c0,-1.657 -1.343,-3 -3,-3h-12c-1.657,0 -3,1.343 -3,3v9.5c0,3.038 2.462,5.5 5.5,5.5z"
                    fill="#1fc090"
                  ></path>
                  <path
                    d="M36,26v1c0,1.657 -1.343,3 -3,3h-10v6h14c2.75,0 5,-2.25 5,-5v-5z"
                    fill="#64b5f6"
                  ></path>
                </g>
              </g>
            </svg>
            <Link to="/">EventEase</Link>
          </div>

          <div className="flex items-center flex-grow">
            <ul className="flex space-x-4 ml-auto">
              {isLoggedIn ? (
                <li className="flex items-center">
                  <p className="mr-2 font-bold">{userData.fullname}</p>
                  <button
                    className="calendarJoinButton | md:px-[1.375rem] md:py-[0.375rem] px-[1rem] py-[0.25rem] rounded-full border border-black text-xs font-medium text-[black] hover:text-white hover:border-none"
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
                      className="calendarJoinButton | md:px-[1.375rem] md:py-[0.375rem] px-[1rem] py-[0.25rem] rounded-full border border-black text-xs font-medium text-[#6F6F6F] hover:text-white hover:border-none"
                      onClick={() => navigate("/login")}
                    >
                      SignIn
                    </button>
                  </li>
                  <li>
                    <button
                      className="calendarJoinButton | md:px-[1.375rem] md:py-[0.375rem] px-[1rem] py-[0.25rem] rounded-full border border-black text-xs font-medium text-[#6F6F6F] hover:text-white hover:border-none"
                      onClick={() => navigate("/register")}
                    >
                      SignUp
                    </button>
                  </li>
                </>
              )}
            </ul>
            {isLoggedIn && userData.userType === "student" && <Menu />}
          </div>
        </div>
      </div>
    </nav>
  );
}
