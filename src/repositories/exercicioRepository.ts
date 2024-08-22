import { PrismaClient, Exercicio } from "@prisma/client";

export class ExercicioRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Exercicio[]> {
    return this.prisma.exercicio.findMany({
      include: { treino: true }, // Inclui o treino associado
    });
  }

  async findById(id: string): Promise<Exercicio | null> {
    return this.prisma.exercicio.findUnique({
      where: { id },
      include: { treino: true }, // Inclui o treino associado
    });
  }

  async save(exercicio: Omit<Exercicio, "id">): Promise<Exercicio> {
    return this.prisma.exercicio.create({
      data: exercicio,
    });
  }

  async update(
    id: string,
    updatedExercicio: Partial<Exercicio>
  ): Promise<Exercicio | null> {
    return this.prisma.exercicio.update({
      where: { id },
      data: updatedExercicio,
    });
  }

  async delete(id: string): Promise<Exercicio | null> {
    return this.prisma.exercicio.delete({
      where: { id },
    });
  }
}
