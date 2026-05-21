import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosToastError from "../../utils/AxiosToastError.js";
import Axios from "../../utils/Axios.js";
import SummaryApi from "../../apies/SummaryApi.js";

export default function OtpVerification() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation()


  useEffect(()=>{
    if(!location?.state?.email){
      navigate("/forgot_password")
    }
  },[location?.state?.email, navigate])

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");

    console.log("OTP to send:", finalOtp);        // ✅ Debug OTP

    if (finalOtp.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    try {

      const response = await Axios({
        ...SummaryApi.forgot_password_otp_verification,
        data: {
           otp: otp.join(""),
           email:location?.state?.email 
          },
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setOtp(["", "", "", "", "", ""])
        navigate("/reset-password", {
         state: {
           data: response.data,
           email: location?.state?.email 
          }
      });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="flex justify-center items-center py-10 bg-gray-100 h-screen">
      <div className="bg-white shadow-lg rounded-2xl px-8 w-full max-w-md mx-2 sm:mx-0">
        <h5 className="text-xl font-semibold text-center mt-3">
          Verify OTP
        </h5>
        <p className="text-center text-gray-500 text-sm mb-6">
          Enter the 6-digit OTP sent to your email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                maxLength="1"
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition"
          >
            Verify OTP
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4 pb-6">
          Didn’t receive the code?{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            Resend
          </span>
        </p>
      </div>
    </div>
  );
}
