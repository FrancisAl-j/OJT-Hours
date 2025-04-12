import jwt from "jsonwebtoken";

export const generateToken = (payload, res) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    //secure: process.env.NODE_ENV !== "development",
    secure: false,
  });

  return token;
};
