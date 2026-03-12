import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, /*gender*/ } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }


    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this email.",
      });
    }
    // const allowedGenders = ["male", "female", "other"];
    // if (!allowedGenders.includes(gender.toLowerCase())) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid gender value.",
    //   });
    // }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Account registered successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    //generate token from jsonwebtoken ...user info temporary store..stay logedin
    generateToken(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};

export const logout = async (_,res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged out successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to logout"
        })
    }
}
export const getUserProfile = async (req,res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password").populate({
  path: "enrolledCourses",
  match: { isPublished: true },
  populate: {
    path: "creator",
    select: "name photoUrl",
  },
});
;
        if(!user){
            return res.status(404).json({
                message:"Profile not found",
                success:false
            })
        }
        return res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to load user"
        })
    }
}
export const updateProfile = async (req,res) => {
    try {
        const userId = req.id;
        const {name} = req.body;
        const profilePhoto = req.file;

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }
//         // extract public id of the old image from the url if it exists;
        if(user.photoUrl){
            const publicId = user.photoUrl.split("/").pop().split(".")[0]; // extract public id
            deleteMediaFromCloudinary(publicId);
        }

//         // upload new photo
        const cloudResponse = await uploadMedia(profilePhoto.path);
        const photoUrl = cloudResponse.secure_url;

        const updatedData = {name, photoUrl};
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {new:true}).select("-password");

        return res.status(200).json({
            success:true,
            user:updatedUser,
            message:"Profile updated successfully."
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to update profile"
        })
    }
};
// Handel Users From Admin Site
export const getAllUsers = async (req, res) => {
  try {
  const users = await User.find().sort({ orderIndex: 1 });


    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};


export const updateUserById = async (req, res) => {
  try {
    const { role } = req.body; // only update role
    const userId = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};


export const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
// ⬇️ Reorder Users: Move Up or Down
// ⬇️ Reorder Users: Move Up or Down
export const reorderUsers = async (req, res) => {
  const { userId, direction } = req.body;

  if (!userId || !["up", "down"].includes(direction)) {
    return res.status(400).json({ message: "Invalid parameters." });
  }

  try {
    const users = await User.find().sort({ orderIndex: 1 });

    const index = users.findIndex((user) => user._id.toString() === userId);

    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= users.length) {
      return res.status(400).json({ message: "Cannot move in that direction." });
    }

    const currentUser = users[index];
    const targetUser = users[swapIndex];

    // ✅ Correct field to swap is `orderIndex`, not `position`
    const temp = currentUser.orderIndex;
    currentUser.orderIndex = targetUser.orderIndex;
    targetUser.orderIndex = temp;

    await currentUser.save();
    await targetUser.save();

    res.status(200).json({ message: "User order updated successfully." });
  } catch (error) {
    console.error("Error reordering users:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Update user order (for drag/drop or up/down reordering)
export const updateUserOrder = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids)) {
      return res.status(400).json({ message: "'ids' must be an array" });
    }

    for (let i = 0; i < ids.length; i++) {
      const userId = ids[i];
      await User.findByIdAndUpdate(userId, { orderIndex: i });
    }

    res.status(200).json({ message: "User order updated successfully" });
  } catch (error) {
    console.error("🔥 Server Error:", error);
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};




// Forget and Reset Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found with this email.",
    });
  }

  const resetToken = user.generateResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
  const resetUrl = `${frontendURL}/reset-password/${resetToken}`;
  const html = `
    <h3>Password Reset Request</h3>
    <p>Click the link below to reset your password:</p>
    <a href="${resetUrl}">${resetUrl}</a>
    <p>This link will expire in 15 minutes.</p>
  `;

  try {
    await sendEmail(user.email, "Password Reset", html);
    return res.status(200).json({
      success: true,
      message: "Reset password link sent to your email.",
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return res.status(500).json({
      success: false,
      message: "Failed to send reset email.",
    });
  }
};


export const resetPassword = async (req, res) => {
  const token = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired password reset token.",
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password reset successful. You can now log in with your new password.",
  });
};
