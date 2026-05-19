import React, { useState } from "react";

import toast from "react-hot-toast";
import {  useNavigate } from "react-router-dom";
import AxiosToastError from "../../utils/AxiosToastError.js"
import Axios from "../../utils/Axios.js";
import SummaryApi from "../../apies/SummaryApi.js";


export default function ForgotPassword() {

    const [data, setData] = useState({
        email : "",
    })

    const handleChange = (e)=>{
        const {name, value} = e.target
        setData ((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })

    }

    const valideValue = Object.values(data).every(el => el)
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        
        try {

          const response = await Axios({
            ...SummaryApi.forgot_password,
            data : data
          })

          if(response.data.error){
            toast.error(response.data.message)
          }
          if(response.data.success){
            toast.success(response.data.message)

            setData({
              email : "",
            })
            navigate("/verification-otp",{state:data})
          }
            
        } catch (error) {
          AxiosToastError(error)
        }

    }


  return (
        <div className=" flex justify-center items-center py-8 bg-gray-200 h-screen">
      <div className="bg-white shadow-lg rounded-2xl px-8 w-full max-w-md mx-2 sm:mx-0">
        <h5 className="text-xl font-semibold text-center mt-3">Forgot Password</h5>

        <form className="space-y-2" onSubmit={handleSubmit} >
          {/* Email */}
          <div className="mt-4">
            <label className="block text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Submit Button */}
          <button
            disabled={!valideValue}
            type="submit"
            className={` ${valideValue ? " bg-green-600 hover:bg-green-700" : "bg-gray-400" } w-full mt-6 font-bold text-white py-2 rounded-lg transition`}
          >
            Send Email for OTP
          </button>
        </form>

       <div className="flex justify-items-start">
         <p className="text-center text-gray-600 my-2">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
       </div>
      </div>
    </div>
    
  );
}
