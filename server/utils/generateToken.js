import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  //jwt.sign help to generate user token
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",   //after one day token will expire
  });

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    .json({
      success: true,
      message,
      user,
    });
};
