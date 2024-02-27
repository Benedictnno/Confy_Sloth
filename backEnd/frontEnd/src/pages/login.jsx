import React from "react";
import Sparrow from "../utils/Sparrow.jpg";
import { useUserContext } from "../context/user_context";

function Login() {
  const { email, setEmail, password, setPassword, Login } = useUserContext();
  function handleClick(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  }
  return (
    <main>
      {/* <div>
        <img src={Sparrow} alt="" />
        <h3>Welcome Back</h3>
        <p>Glad to have you again</p>
      </div> */}

      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Login</h2>
          <div className="flex flex-col">
            <input
              type="email"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Email address"
              name="email"
              required
              value={email}
              onChange={(e) => handleClick(e)}
            />
            <input
              type="password"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={(e) => handleClick(e)}
            />
            <div className="flex items-center justify-between flex-wrap">
              <label
             
                className="text-sm text-gray-900 cursor-pointer"
              >
                <input type="checkbox" id="remember-me" className="mr-2" />
                Remember me
              </label>
              <a
                href="#"
                className="text-sm text-blue-500 hover:underline mb-0.5"
              >
                Forgot password?
              </a>
              <p className="text-gray-900 mt-4">
                {" "}
                Don't have an account?{" "}
                <a
                  href="#"
                  className="text-sm text-blue-500 -200 hover:underline mt-4"
                >
                  Signup
                </a>
              </p>
            </div>
            <button
              onClick={Login}
              type="button"
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
