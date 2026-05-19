// OTP base Login (jaisy whatsap etc otp daty hn login ho jaty hn)

import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import AxiosToastError from "../../utils/AxiosToastError.js";
import { fetchUserDetails, userLogin, sendLoginOtp, verifyLoginOtp} from "../../reduxStore/userSlice.js";



export default function Login() {
  const [data, setData] = useState({
     email: "",
     password: ""
     });
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // ================= PASSWORD LOGIN =================
  const handlePasswordLogin = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const result = await dispatch(userLogin(data));

      if (userLogin.rejected.match(result)) {
        toast.error(result.payload);
        return;
      }

      const { accessToken, refreshToken } = result.payload;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      await dispatch(fetchUserDetails());

      toast.success("Login successful");
      navigate("/home");
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // ================= SEND OTP =================
  const handleSendOtp = async () => {
    if (!data.email) {
      toast.error("Enter email first");
      return;
    }

    const result = await dispatch(sendLoginOtp(data.email));

    if (sendLoginOtp.rejected.match(result)) {
      toast.error(result.payload);
    } else {
      toast.success("OTP sent to your email");
      setIsOtpMode(true);
    }
  };

  // ================= VERIFY OTP =================
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Enter OTP");
      return;
    }

    const result = await dispatch(
      verifyLoginOtp({ email: data.email, otp })
    );

    if (verifyLoginOtp.rejected.match(result)) {
      toast.error(result.payload);
      return;
    }

    const { accessToken, refreshToken } = result.payload;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    await dispatch(fetchUserDetails());

    toast.success("Login successful");
    navigate("/home");
  };

  return (
    <div className="flex justify-center items-center py-8 bg-gray-200 h-screen">
      <div className="bg-white shadow-lg rounded-2xl px-8 w-full max-w-md mx-2 sm:mx-0">
        <h2 className="text-2xl font-semibold text-center mt-4">
          {isOtpMode ? "Login with OTP" : "Login"}
        </h2>

        {/* EMAIL */}
        <div className="mt-4">
          <label className="block text-gray-700 mb-1">Email Address::
            
          </label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Enter your Email"
            className="text-gray-500 w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* PASSWORD MODE */}
        {!isOtpMode && (
          <form onSubmit={handlePasswordLogin} className="space-y-3 mt-3">
            <div>
              <label>Password:</label>
              <div className="flex border border-gray-300 rounded-lg">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="text-gray-500 w-full px-3 py-1 focus:outline-none focus:ring-0"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className=" flex items-center gap-2 px-3 cursor-pointer"
                >
                   <span>🔒</span>
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
              </div>
            </div>

            <div className="flex">
               <Link
                 to="/forgot_password"
                 className="ml-auto pl-2 pt-1 text-blue-600 hover:text-blue-600 cursor-pointer hover:underline"
               >
                 Forgot Password?
               </Link>
             </div>

            <button className="w-full bg-green-600 text-white py-2 rounded-lg">
              Login
            </button>

            <button
              type="button"
              onClick={handleSendOtp}
              className="text-blue-600 underline w-full cursor-pointer"
            >
              Login with OTP instead
            </button>
          </form>
        )}

        {/* OTP MODE */}
        {isOtpMode && (
          <div className="space-y-3 mt-3">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />

            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-600 text-white py-2 rounded-lg"
            >
              Verify OTP
            </button>

            <button
              onClick={() => setIsOtpMode(false)}
              className="text-blue-600 underline w-full"
            >
              Back to Password Login
            </button>
          </div>
        )}

        <div className="text-center mt-4 mb-4">
          <p>
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}



