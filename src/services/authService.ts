import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

const prisma = new PrismaClient();

export const registerAluno = async (
  matricula: string,
  name: string,
  idade: number,
  senha: string
) => {
  const hashedSenha = await bcrypt.hash(senha, 10);
  const aluno = await prisma.aluno.create({
    data: {
      matricula,
      name,
      idade,
      senha: hashedSenha,
    },
  });
  return generateToken(aluno.id);
};

export const loginAluno = async (matricula: string, senha: string) => {
  const aluno = await prisma.aluno.findUnique({
    where: { matricula },
  });
  if (!aluno) throw new Error("Aluno não encontrado");

  const isMatch = await bcrypt.compare(senha, aluno.senha);
  if (!isMatch) throw new Error("Senha inválida");

  return generateToken(aluno.id);
};
