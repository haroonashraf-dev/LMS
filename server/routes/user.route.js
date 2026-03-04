import express from "express";
import {
  deleteUserById,
  forgotPassword,
  getAllUsers,
  getUserProfile,
  login,
  logout,
  register,
  resetPassword,
  updateProfile,
  updateUserById,
  updateUserOrder, // ✅ Import this controller
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";

const router = express.Router();

// Auth & Profile
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/edit-profile", isAuthenticated, getUserProfile);
router.put("/edit-profile/update", isAuthenticated, upload.single("profilePhoto"), updateProfile);

// Users
router.get("/", isAuthenticated, getAllUsers);

// ✅ ADD THIS BEFORE `/:id` ROUTE
router.put("/update-order", isAuthenticated, updateUserOrder); // <-- this must be ABOVE the dynamic :id routes

// Update/Delete User by ID (must be last)
router.put("/:id", isAuthenticated, updateUserById);
router.delete("/:id", isAuthenticated, deleteUserById);

// Password Reset
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
