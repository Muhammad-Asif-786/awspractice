import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import Axios from '../../utils/Axios';
import SummaryApi from '../../apies/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../../utils/AxiosToastError';

const ResetPassword = () => {

    const location = useLocation()
    const navigate = useNavigate()

    // 🔒 Guard redirect (no useEffect needed)
    if (!location?.state?.data?.success) {
        navigate("/home")
    }

    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [data, setData] = useState({
        email: location?.state?.email || "",
        newPassword: "",
        confirmPassword: ""
    })

    const valideValue =
        data.newPassword.trim() && data.confirmPassword.trim()

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (data.newPassword !== data.confirmPassword) {
            toast.error("New Password and Confirm Password must be same")
            return
        }

        try {
            const response = await Axios({
                ...SummaryApi.resetPassword,
                data: data,
            })

            if (response.data.error) {
                toast.error(response.data.message)
            }

            if (response.data.success) {
                toast.success(response.data.message)

                setData({
                    email: "",
                    newPassword: "",
                    confirmPassword: ""
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

                <h4 className="text-xl font-semibold text-center mt-3 my-4">
                    Reset Password
                </h4>

                <form className="space-y-3" onSubmit={handleSubmit}>

                    {/* New Password */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            New Password
                        </label>

                        <div className="flex items-center border border-gray-300 rounded-lg">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                name="newPassword"
                                value={data.newPassword}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                className="w-full px-3 py-2 rounded-lg focus:outline-none"
                            />

                            <div
                                onClick={() => setShowNewPassword(prev => !prev)}
                                className="flex items-center gap-2 cursor-pointer px-3"
                            >
                                 {/* <span>🚀</span> */}
                                 <span>🔒</span>
                                {showNewPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </div>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div> 
                        <label className="block text-gray-700 mb-1">
                            Confirm Password
                        </label>

                        <div className="flex items-center border border-gray-300 rounded-lg">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm new password"
                                className="w-full px-3 py-2 rounded-lg focus:outline-none"
                            />

                            <div
                                onClick={() => setShowConfirmPassword(prev => !prev)}
                                className="flex items-center gap-2 cursor-pointer px-3"
                            >
                                 <span>🔒</span>
                                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        disabled={!valideValue}
                        type="submit"
                        className={`${valideValue
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-gray-400"
                            } w-full mt-4 text-white py-2 rounded-lg transition`}
                    >
                        Change Password
                    </button>

                </form>

                <p className="text-center text-gray-600 mt-5 mb-10">
                    Already have an account?{" "}
                  <a href="/login" className="text-blue-600 hover:underline">
                      Login
                  </a>
                </p>

            </div>
        </div>
    )
}

export default ResetPassword