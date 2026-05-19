export const baseURL = import.meta.env.VITE_API_URL || "http://localhost:1000";

const SummaryApi = {
    register : {
        url : '/api/user/register',
        method : 'post'
    },
    login : {
            url : '/api/user/login',
            method : 'post'
    },
    userDetails: {
            url : '/api/user/user-details',
            method : 'get'
    },
    forgot_password: {
        url : '/api/user/forgot_password',
        method : 'put'
    },
    forgot_password_otp_verification: {
        url : '/api/user/verify_forgot_password_otp',
        method : 'put'
    },
    resetPassword: {
        url : '/api/user/reset-password',
        method : 'put'
    },
    // send otp base login api
    sendLoginOtp: {
        url: '/api/user/send-login-otp',
        method: 'post'
    },
    verifyLoginOtp: {
        url: '/api/user/verify-login-otp',
        method: 'post'
    },
}


export default SummaryApi