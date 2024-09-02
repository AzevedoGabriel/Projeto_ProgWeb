import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "1234567";

export const generateToken = (alunoId: string) => {
  return jwt.sign({ alunoId }, secret, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};
