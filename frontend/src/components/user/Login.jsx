import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import Loader from "../ui/Loader";
import { useNavigate, useLocation } from "react-router-dom";
// import MetaData from "../layout/MetaData";
import { useAuthStore } from "../../Stores/authStore";

const Login = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);

  const navigate = useNavigate();
  const location = useLocation();
  //   const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const redirect = location.state?.from || "/profile";

  //   const { error, loading, isAuthenticated } = useSelector(
  //     (state) => state.user
  //   );

  useEffect(() => {
    // if (error) {
    //   toast.error(error);
    //   dispatch(clearErrors());
    // }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [navigate, redirect]);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = async (e) => {
    e.preventDefault();
    // dispatch(login(loginEmail, loginPassword));
    const response = await login(loginEmail, loginPassword);
    console.log("response: ", response && response);
      if(response && response.success){
        toast.success(response.message)
        navigate("/");
      } else {
        toast.error(response && response.message);
      }

  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full h-screen">
          {/* <Loader /> */}
          Loading...
        </div>
      ) : (
        <div className="absolute top-0 z-13 w-full min-h-screen bg-bgColor flex items-start pt-8 justify-center ">
          {/* <MetaData title={`Login to Shoocart`} /> */}
          <div className="form mt-8 bg-white/70 w-[53vmax] sm:w-[60%] md:w-[48%] lg:w-[32%] h-[80%] rounded-xl flex flex-col items-center justify-start py-10 border-2 border-black/10 mt-20">
            <div className="top flex flex-col items-center w-full">
              <div className="logo">
                <svg
                  width="130"
                  height="41"
                  viewBox="0 0 130 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M54.872 30V13.08H61.016C62.952 13.08 64.584 13.416 65.912 14.088C67.256 14.744 68.272 15.704 68.96 16.968C69.648 18.216 69.992 19.736 69.992 21.528C69.992 23.304 69.648 24.824 68.96 26.088C68.272 27.352 67.256 28.32 65.912 28.992C64.584 29.664 62.952 30 61.016 30H54.872ZM57.968 27.432H60.824C62.872 27.432 64.392 26.944 65.384 25.968C66.376 24.992 66.872 23.512 66.872 21.528C66.872 19.528 66.376 18.048 65.384 17.088C64.392 16.112 62.872 15.624 60.824 15.624H57.968V27.432ZM78.3853 30.24C77.1373 30.24 76.0573 29.984 75.1453 29.472C74.2333 28.96 73.5213 28.232 73.0093 27.288C72.5133 26.344 72.2653 25.224 72.2653 23.928C72.2653 22.632 72.5133 21.52 73.0093 20.592C73.5213 19.648 74.2333 18.92 75.1453 18.408C76.0573 17.896 77.1373 17.64 78.3853 17.64C79.6333 17.64 80.7133 17.896 81.6253 18.408C82.5533 18.92 83.2653 19.648 83.7613 20.592C84.2733 21.52 84.5293 22.632 84.5293 23.928C84.5293 25.224 84.2733 26.344 83.7613 27.288C83.2653 28.232 82.5533 28.96 81.6253 29.472C80.7133 29.984 79.6333 30.24 78.3853 30.24ZM78.3853 27.936C79.3293 27.936 80.0813 27.608 80.6413 26.952C81.2013 26.28 81.4813 25.272 81.4813 23.928C81.4813 22.584 81.2013 21.584 80.6413 20.928C80.0813 20.272 79.3293 19.944 78.3853 19.944C77.4413 19.944 76.6893 20.272 76.1293 20.928C75.5693 21.584 75.2893 22.584 75.2893 23.928C75.2893 25.272 75.5693 26.28 76.1293 26.952C76.6893 27.608 77.4413 27.936 78.3853 27.936ZM92.6844 30.24C91.4364 30.24 90.3404 29.984 89.3964 29.472C88.4684 28.96 87.7484 28.232 87.2364 27.288C86.7244 26.328 86.4684 25.192 86.4684 23.88C86.4684 22.568 86.7244 21.448 87.2364 20.52C87.7644 19.592 88.4924 18.88 89.4204 18.384C90.3484 17.888 91.4364 17.64 92.6844 17.64C93.4844 17.64 94.2604 17.768 95.0124 18.024C95.7804 18.264 96.4044 18.616 96.8844 19.08L95.9724 21.168C95.5404 20.768 95.0524 20.472 94.5084 20.28C93.9804 20.072 93.4604 19.968 92.9484 19.968C91.8764 19.968 91.0364 20.304 90.4284 20.976C89.8364 21.648 89.5404 22.624 89.5404 23.904C89.5404 25.184 89.8364 26.168 90.4284 26.856C91.0364 27.544 91.8764 27.888 92.9484 27.888C93.4444 27.888 93.9564 27.792 94.4844 27.6C95.0284 27.408 95.5244 27.112 95.9724 26.712L96.8844 28.776C96.3884 29.24 95.7564 29.6 94.9884 29.856C94.2364 30.112 93.4684 30.24 92.6844 30.24ZM106.122 30V26.688H98.5621V24.528L106.602 13.08H109.098V24.336H111.522V26.688H109.098V30H106.122ZM106.122 24.336V16.728H106.698L100.866 25.056V24.336H106.122ZM120.897 30.24C118.481 30.24 116.681 29.64 115.497 28.44C114.329 27.224 113.745 25.432 113.745 23.064V13.08H116.841V23.04C116.841 24.544 117.161 25.68 117.801 26.448C118.457 27.216 119.489 27.6 120.897 27.6C122.241 27.6 123.249 27.216 123.921 26.448C124.609 25.68 124.953 24.544 124.953 23.04V13.08H128.001V23.064C128.001 25.432 127.401 27.224 126.201 28.44C125.017 29.64 123.249 30.24 120.897 30.24Z"
                    fill="#233348"
                  />
                  <circle cx="20.5" cy="20.5" r="20.5" fill="#458ff6" />
                  <path
                    d="M15.028 31V12.67H21.684C23.7813 12.67 25.5493 13.034 26.988 13.762C28.444 14.4727 29.5447 15.5127 30.29 16.882C31.0353 18.234 31.408 19.8807 31.408 21.822C31.408 23.746 31.0353 25.3927 30.29 26.762C29.5447 28.1313 28.444 29.18 26.988 29.908C25.5493 30.636 23.7813 31 21.684 31H15.028ZM18.382 28.218H21.476C23.6947 28.218 25.3413 27.6893 26.416 26.632C27.4907 25.5747 28.028 23.9713 28.028 21.822C28.028 19.6553 27.4907 18.052 26.416 17.012C25.3413 15.9547 23.6947 15.426 21.476 15.426H18.382V28.218Z"
                    fill="white"
                  />
                </svg>
              </div>
              <p className="mainText font-bold text-lg mt-3">Welcome Back</p>
              <p className="subText text-gray-500 text-sm">
                Please enter your details to login
              </p>
            </div>

            <form
              action=""
              className="w-full flex justify-center mt-10 px-7"
              onSubmit={loginSubmit}
            >
              <div className="w-full email flex flex-col gap-1 w-70%">
                <label htmlFor="email" className="font-semibold">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={loginEmail}
                  placeholder="Enter your Email"
                  className="w-full rounded-md p-2.5 outline-none border"
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <label htmlFor="password" className="font-semibold mt-2">
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={loginPassword}
                  placeholder="Enter your Password"
                  className="w-full rounded-md p-2.5 outline-none border"
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <p className="text-blue-500 text-sm mt-1">
                  <Link to="/password/forgot">Forgot Password?</Link>
                </p>

                <div className="cta">
                  <button
                    type="submit"
                    className="w-full h-full bg-accentColor rounded-xl mt-3 hover:bg-[#458FF6] p-1.5 font-semibold text-lg border-2 border-black/10"
                  >
                    Login
                  </button>
                </div>
                <div className="linkText mt-3 text-[15px]">
                  Don't have an account?
                  <Link to="/signup" className="text-blue-500 text-base">
                    Register
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
