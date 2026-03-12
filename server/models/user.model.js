import mongoose from "mongoose";
import crypto from "crypto"; // ⬅️ NEW IMPORT

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["admin", "instructor", "student"],
      default: "student",
    },

    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],

    photoUrl: { type: String, default: "" },
    // 🆕 Custom order field
   orderIndex: {
  type: Number,
  default: 0,
},

    // 🔐 New fields for password reset
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// 🔐 Token generation method
userSchema.methods.generateResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

export const User = mongoose.model("User", userSchema);
