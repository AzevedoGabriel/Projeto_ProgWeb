import { PrismaClient, Aluno } from "@prisma/client";

export class AlunoRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Aluno[]> {
    return this.prisma.aluno.findMany({
      include: { professor: true }, 
    });
  }

  async findById(id: string): Promise<Aluno | null> {
    return this.prisma.aluno.findUnique({
      where: { id },
      include: { professor: true }, 
    });
  }

  async save(aluno: Omit<Aluno, "id">): Promise<Aluno> {
    return this.prisma.aluno.create({
      data: aluno,
    });
  }

  async update(
    id: string,
    updatedAluno: Partial<Aluno>
  ): Promise<Aluno | null> {
    return this.prisma.aluno.update({
      where: { id },
      data: updatedAluno,
      include: { professor: true },
    });
  }

  async delete(id: string): Promise<Aluno | null> {
    return this.prisma.aluno.delete({
      where: { id },
    });
  }
}
