import { PrismaClient, Treino } from "@prisma/client";

export class TreinoRepository {
  private prisma = new PrismaClient();

  async getAllTreinos(): Promise<Treino[]> {
    return this.prisma.treino.findMany();
  }

  async getTreinoById(id: string): Promise<Treino | null> {
    return this.prisma.treino.findUnique({
      where: { id },
    });
  }

  async createTreino(data: Omit<Treino, "id">): Promise<Treino> {
    return this.prisma.treino.create({
      data,
    });
  }

  async updateTreino(
    id: string,
    data: Partial<Treino>
  ): Promise<Treino | null> {
    return this.prisma.treino.update({
      where: { id },
      data,
    });
  }

  async deleteTreino(id: string): Promise<Treino | null> {
    return this.prisma.treino.delete({
      where: { id },
    });
  }
}
