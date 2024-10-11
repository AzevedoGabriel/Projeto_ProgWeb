import { PrismaClient, Aluno } from "@prisma/client";

export class AlunoRepository {
  update(id: string, updatedAluno: Partial<{ id: string; matricula: string; name: string; idade: string; senha: string; }>): { id: string; matricula: string; name: string; idade: string; senha: string; } | PromiseLike<{ id: string; matricula: string; name: string; idade: string; senha: string; } | null> | null {
    throw new Error("Method not implemented.");
  }
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Aluno[]> {
    return this.prisma.aluno.findMany({});
  }

  async findById(id: string): Promise<Aluno | null> {
    return this.prisma.aluno.findUnique({
      where: { id },
    });
  }

  async save(aluno: Omit<Aluno, "id">): Promise<Aluno> {
    return this.prisma.aluno.create({
      data: aluno,
    });
  }

  /**
  async update(
    id: string,
    updatedAluno: Partial<Aluno>
  ): Promise<Aluno | null> {
    return this.prisma.aluno.update({
      where: { id },
      data: updatedAluno,
    });
  }
 */
  async delete(id: string): Promise<Aluno | null> {
    return this.prisma.aluno.delete({
      where: { id },
    });
  }
}
