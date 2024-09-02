import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "your_secret_key";

export const generateToken = (alunoId: string) => {
  return jwt.sign({ alunoId }, secret, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};
