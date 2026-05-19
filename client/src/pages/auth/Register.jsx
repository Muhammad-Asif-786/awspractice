import React, { useState } from "react";
import Axios from "../../utils/Axios.js";
import SummaryApi from "../../apies/SummaryApi.js";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import AxiosToastError from "../../utils/AxiosToastError.js";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";


export default function Register() {

    const [data, setData] = useState({
          name : "",
          email : "",
          mobile : "",
          password : "",
          confirmPassword : ""
    })
    
    const valideValue = Object.values(data).every(el => el)
    const navigate = useNavigate()
    const [showPassword, setShowPassword]= useState(false)
    const [confirmPassword, setconfirmPassword]= useState(false)


    const handleChange = (e)=>{

        const {name, value} =e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }


    const handleSubmit =async (e)=>{
         e.preventDefault()

        if(data.password !== data.confirmPassword){
          toast.error("Password and confirm password must be same")
           return
          }

         try {
          const response = await Axios({
            ...SummaryApi.register,
            data : data
          })

          if(response.data.error){
            toast.error(response.data.message)
          }
          if(response.data.success){
            toast.success(response.data.message)
            setData({
                name : "",
                email : "",
                mobile : "",
                password : "",
                confirmPassword : ""
            })
            navigate("/login")
          }

         } catch (error) {
          AxiosToastError(error)
            
         }
    }



  return (
    <div className="flex justify-center items-center py-8 bg-gray-200 h-screen">
      <div className="bg-white shadow-lg rounded-2xl px-8 w-full max-w-md mx-2 sm:mx-0">
        <h2 className="text-2xl font-semibold text-center mt-3">Create Account</h2>

        <form className="space-y-2" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="name"
              id="name"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="text-gray-400 w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="text-gray-400 w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* mobile */}
          <div>
            <label className="block text-gray-700 mb-1">Mobile</label>
            <input
              type="mobile"
              id="mobile"
              name="mobile"
              value={data.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile"
              className="text-gray-400 w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"

            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <div className="flex bg-white items-center  border border-gray-300 rounded-lg ">
              <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="text-gray-400 w-full px-3 py-1 rounded-lg focus:outline-none "
            />
            <div
              onClick={() => setShowPassword(prev => !prev)}
              className="flex items-center gap-2 cursor-pointer px-1"
              >
                <span>🔒</span>
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <div  className="flex bg-white items-center  border border-gray-300 rounded-lg " >
              <input
              type={confirmPassword ? "text":"password"}
              id="confirmPassword"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="text-gray-400 w-full px-3 py-1 rounded-lg focus:outline-none "
            />
            <div
              onClick={() => setconfirmPassword(prev => !prev)}
              className="flex items-center gap-2  cursor-pointer px-1"
              >
                <span>🔒</span>
              {confirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
            </div>

          </div>

          {/* Submit Button */}
          <button
            disabled={!valideValue}
            type="submit"
            className={` ${valideValue ? " bg-green-600 hover:bg-green-700" : "bg-gray-400" } w-full text-white py-2 rounded-lg transition`}
          >
            Register
          </button>
        </form>
         <div className="flex justify-items-start mb-6">
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
