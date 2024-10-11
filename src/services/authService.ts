import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

const prisma = new PrismaClient();

export const registerProfessor = async (
  matricula: string,
  nome: string,
  idade: string,
  senha: string
) => {
  const hashedSenha = await bcrypt.hash(senha, 10);
  const professor = await prisma.professor.create({
    data: {
      matricula,
      nome,
      idade,
      senha: hashedSenha,
    },
  });
  return generateToken(professor.id);
};

export const loginProfessor = async (matricula: string, senha: string) => {
  const professor = await prisma.professor.findUnique({
    where: { matricula },
  });
  if (!professor) throw new Error("Professor não encontrado");

  const isMatch = await bcrypt.compare(senha, professor.senha);
  if (!isMatch) throw new Error("Senha inválida");

  return generateToken(professor.id);
};

export const registerAluno = async (
  matricula: string,
  name: string,
  idade: string,
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
