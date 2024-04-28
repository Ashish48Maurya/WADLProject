import React, { useState } from "react";
import { useAuth } from "../Components/Store/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const { storeTokenInLS, backend_api } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [department, setDepartment] = useState("CSE");
  const [userType, setUserType] = useState("student");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userType, department);
    if (!password || !email || !fullname || !department || !userType) {
      return toast.error("All Fields are Required!!!");
    }

    try {
      const response = await fetch(`${backend_api}/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userType,
          department,
          fullname,
          email,
          password,
        }),
      });

      if (response.status === 200) {
        toast.success("Registration Successful");
        navigate("/login");
      } else {
        return toast.error("Registration Fail");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="h-screen">
        <div className="container h-full px-6 py-24">
          <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12 hidden md:block ">
              <img
                src="https://www.tailwindtap.com/assets/common/marketing.svg"
                className="w-full "
                alt="Phone"
              />
            </div>

            <div className="md:w-8/12 lg:ms-6 lg:w-5/12">
              <form onSubmit={handleSubmit}>
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                  <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                      <div>
                        <h1 className="text-2xl font-semibold">
                          Register
                        </h1>
                      </div>
                      <div className="divide-y divide-gray-200">
                        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                          <div className="relative">
                            <input
                              autoComplete="off"
                              id="fullname"
                              name="fullname"
                              type="text"
                              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                              placeholder="Full Name"
                              value={fullname}
                              onChange={(e) => setFullname(e.target.value)}
                            />
                            <label
                              htmlFor="fullname"
                              className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                            >
                              Full Name
                            </label>
                          </div>
                          <div className="relative">
                            <input
                              autoComplete="off"
                              id="email"
                              name="email"
                              type="text"
                              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                              placeholder="Email address"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <label
                              htmlFor="email"
                              className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                            >
                              Email Address
                            </label>
                          </div>
                          <div className="relative">
                            <input
                              autoComplete="off"
                              id="password"
                              name="password"
                              type="password"
                              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <label
                              htmlFor="password"
                              className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                            >
                              Password
                            </label>
                          </div>
                          <div className="relative">
                            <label
                              htmlFor="department"
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Department
                            </label>
                            <select
                              id="department"
                              name="department"
                              value={department}
                              onChange={(e) => setDepartment(e.target.value)}
                              className="w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 bg-white rounded-md shadow-sm text-base p-2"
                            >
                              <option className="text-gray-900" value="CSE">
                                CSE
                              </option>
                              <option className="text-gray-900" value="IT">
                                IT
                              </option>
                              <option className="text-gray-900" value="ICB">
                                ICB
                              </option>
                              <option className="text-gray-900" value="CSDS">
                                CSDS
                              </option>
                              <option className="text-gray-900" value="MECH">
                                MECH
                              </option>
                            </select>
                          </div>
                          <div className="relative">
                            <label
                              htmlFor="userType"
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              User Type
                            </label>
                            <select
                              id="userType"
                              name="userType"
                              value={userType}
                              onChange={(e) => setUserType(e.target.value)}
                              className="w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 bg-white rounded-md shadow-sm text-base p-2"
                            >
                              <option value="teacher" className="text-gray-900">
                                Teacher
                              </option>
                              <option value="student" className="text-gray-900">
                                Student
                              </option>
                            </select>
                          </div>
                          <div className="relative">
                            <button
                              type="submit"
                              className="bg-blue-500 text-white rounded-md px-2 py-1"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 capitalize text-center w-full">
                          Already have an account?{" "}
                          <Link className="text-blue-700" to="/login">
                            Sign In
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
