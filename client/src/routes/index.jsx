import React from 'react';
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from '../App.jsx';
import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';
import ForgotPassword from '../pages/auth/ForgotPassword.jsx';
import OtpVerification from '../pages/auth/OtpVerification.jsx';
import ResetPassword from '../pages/auth/ResetPassword.jsx';
import Home from '../pages/app/Home.jsx';


const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                index: true,
                element: <Navigate to="/Login" />
            },
            {
                path : "/Login",
                element : <Login/>
            },
            {
                path : "/Register",
                element : <Register/>
            },
              {
                path: "forgot_password",
                element: <ForgotPassword/>
            },
            {
                path: "verification-otp",
                element: <OtpVerification/>
            },
            {
                path: "reset-password",
                element: <ResetPassword/>
            },
            {
                path: "/home",
                element: <Home/>
            },
        ]
    }
])

export default router