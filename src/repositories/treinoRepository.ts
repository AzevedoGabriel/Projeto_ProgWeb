import { PrismaClient, Treino } from "@prisma/client";

export class TreinoRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Treino[]> {
    return this.prisma.treino.findMany({
      include: { exercicios: true }, // Inclui os exercícios associados
    });
  }

  async findById(
    id: string
  ): Promise<
    (Treino & { exercicios: { duracao: number; descanso: number }[] }) | null
  > {
    return this.prisma.treino.findUnique({
      where: { id },
      include: { exercicios: true },
    });
  }

  async save(treino: Omit<Treino, "id">): Promise<Treino> {
    return this.prisma.treino.create({
      data: treino,
    });
  }

  async update(
    id: string,
    updatedTreino: Partial<Treino>
  ): Promise<Treino | null> {
    return this.prisma.treino.update({
      where: { id },
      data: updatedTreino,
      include: { exercicios: true },
    });
  }

  async delete(id: string): Promise<Treino | null> {
    return this.prisma.treino.delete({
      where: { id },
    });
  }
}
