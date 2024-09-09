import { PrismaClient, Exercicio } from "@prisma/client";

export class ExercicioRepository {
  private prisma = new PrismaClient();

  async findAll(): Promise<Exercicio[]> {
    return this.prisma.exercicio.findMany();
  }

  async findById(id: string): Promise<Exercicio | null> {
    return this.prisma.exercicio.findUnique({
      where: { id },
    });
  }

  async findByTreinoId(treinoId: string): Promise<Exercicio[]> {
    return this.prisma.exercicio.findMany({
      where: { treinoId },
    });
  }

  async save(exercicioData: {
    nome: string;
    treinoId: string;
  }): Promise<Exercicio> {
    return this.prisma.exercicio.create({
      data: exercicioData,
    });
  }

  async update(id: string, exercicioData: {
    nome?: string;
    duracao?: number;
    descanso?: number;
  }): Promise<Exercicio | null> {
    return this.prisma.exercicio.update({
      where: { id },
      data: {
        nome: exercicioData.nome,
      },
    });
  }

  async delete(id: string): Promise<Exercicio | null> {
    return this.prisma.exercicio.delete({
      where: { id },
    });
  }
}
