import { PrismaClient, Treino, Exercicio } from "@prisma/client";

export class TreinoRepository {
  private prisma = new PrismaClient();

  async findAll(): Promise<Treino[]> {
    return this.prisma.treino.findMany({
      include: { exercicios: true },
    });
  }

  async findById(id: string): Promise<Treino | null> {
    return this.prisma.treino.findUnique({
      where: { id },
      include: { exercicios: true },
    });
  }

  async save(treinoData: {
    nome: string;
    descricao?: string;
    data: Date;
    duracao: number;
    exercicios?: {
      nome: string;
    }[];
  }): Promise<Treino> {
    return this.prisma.treino.create({
      data: {
        nome: treinoData.nome,
        descricao: treinoData.descricao || null,
        data: treinoData.data,
        duracao: treinoData.duracao,
        exercicios: {
          create: treinoData.exercicios?.map(exercicio => ({
            nome: exercicio.nome
          })) || [],
        },
      },
    });
  }

  async update(id: string, treinoData: {
    nome?: string;
    descricao?: string;
    data?: Date;
    duracao?: number;
    exercicios?: {
      id: string;
      nome: string;
    }[];
  }): Promise<Treino | null> {
    const treino = await this.prisma.treino.findUnique({
      where: { id },
      include: { exercicios: true },
    });

    if (!treino) {
      throw new Error('Treino not found');
    }

    // Update the treino record
    const updatedTreino = await this.prisma.treino.update({
      where: { id },
      data: {
        nome: treinoData.nome,
        descricao: treinoData.descricao || null,
        data: treinoData.data,
        duracao: treinoData.duracao,
      },
    });

    // Update or create exercises
    if (treinoData.exercicios) {
      for (const exercicio of treinoData.exercicios) {
        if (exercicio.id) {
          await this.prisma.exercicio.update({
            where: { id: exercicio.id },
            data: {
              nome: exercicio.nome
            },
          });
        } else {
          await this.prisma.exercicio.create({
            data: {
              nome: exercicio.nome,
              treinoId: id,
            },
          });
        }
      }
    }

    return updatedTreino;
  }

  async delete(id: string): Promise<Treino | null> {
    return this.prisma.treino.delete({
      where: { id },
      include: { exercicios: true },
    });
  }
}
