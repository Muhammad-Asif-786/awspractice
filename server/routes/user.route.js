import {Router} from "express"
import { forgotPasswordController, getAllUsersController, loginController, logoutController, refreshToken, registerUserController, resetpassword, sendLoginOtpController, updateUserDetails, uploadAvatar, uploadFilesController, userDetails, verifyEmailController, verifyForgotPasswordOtp, verifyLoginOtpController } from "../controllers/user.controller.js"
import auth from "../middleware/auth.js"
import upload from "../middleware/multer.js"


const userRouter = Router()


userRouter.post("/register",registerUserController)
userRouter.post("/verify-email",verifyEmailController)
userRouter.post("/login",loginController)
userRouter.post("/logout",auth , logoutController)
userRouter.put("/upload-avatar", auth, upload.single('avatar'), uploadAvatar)// ya profile ki single image upload k liay
userRouter.put("/update-user", auth, updateUserDetails)
userRouter.put("/forgot_password", forgotPasswordController)
userRouter.put("/verify_forgot_password_otp", verifyForgotPasswordOtp)
userRouter.put("/reset-password",resetpassword)
userRouter.post("/refresh-token", refreshToken)
userRouter.get("/user-details", auth, userDetails)
userRouter.post("/send-login-otp", sendLoginOtpController);
userRouter.post("/verify-login-otp", verifyLoginOtpController);
userRouter.get("/all-users", auth,  getAllUsersController)
userRouter.post("/upload-files", upload.array("image[]"), uploadFilesController) // ya multiple files ko upload krny k liay



export default userRouter

