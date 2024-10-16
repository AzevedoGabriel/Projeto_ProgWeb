import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "1234567";

export const generateToken = (id: string) => {
  return jwt.sign({ id }, secret, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};
