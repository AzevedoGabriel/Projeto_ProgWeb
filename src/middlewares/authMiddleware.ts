import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = "1234567";

interface CustomRequest extends Request {
  user?: any; 
}

const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    return res.status(403).json({ message: "Token inválido" });
  }
};

export default authMiddleware;
