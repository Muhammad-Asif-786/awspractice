import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    mobile: {
      type: String,
      // required: true,
      unique: true,
      trim: true,
    },

    phoneSuffix: {
      type: String,
      default: "+92",
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
    },

    name: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      default: null, // optional for OTP login
    },

    avatar: {
      type: String,
      default: "",
    },

    refresh_token: {
      type: String,
      default: "",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    lastLoginDate: {
      type: Date,
      default: null,
    },

    lastSeen: {
      type: Date,
      default: null,
    },

    isOnline: {
      type: Boolean,
      default: false,
    },

    agreed: {
      type: Boolean,
      default: false,
    },

    forgot_password_otp: {
      type: String,
      default: null,
    },
    forgot_password_expiry: {
      type: Date,
      default: "",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    // ADD THESE FIELDS inside userSchema for OTP base login
    login_otp: {
      type: String,
      default: ""
    },
    login_otp_expiry: {
      type: Date,
      default: ""
    }
  },
  { timestamps: true },
);


const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
