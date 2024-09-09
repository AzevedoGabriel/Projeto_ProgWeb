import { Treino, Exercicio } from "@prisma/client";
import { TreinoRepository } from "../repositories/treinoRepository";
import { ExercicioRepository } from "../repositories/exercicioRepository";

export class TreinoService {
  private treinoRepository: TreinoRepository;
  private exercicioRepository: ExercicioRepository;

  constructor() {
    this.treinoRepository = new TreinoRepository();
    this.exercicioRepository = new ExercicioRepository();
  }

  async getAllTreinos(): Promise<Treino[]> {
    return this.treinoRepository.findAll();
  }

  async getTreinoById(id: string): Promise<Treino | null> {
    return this.treinoRepository.findById(id);
  }

  async createTreino(treino: {
    nome: string;
    descricao?: string;
    data: Date;
    duracao: number;
  }): Promise<Treino> {
    return this.treinoRepository.save(treino);
  }

  async updateTreino(id: string, treinoData: {
    nome?: string;
    descricao?: string;
    data?: Date;
    duracao?: number;
    exercicios?: {
      id?: string;
      nome?: string;
    }[];
  }): Promise<Treino | null> {
    // Prepare data for update
    const { nome, descricao, data, duracao, exercicios } = treinoData;

    // Prepare data object
    const dataToUpdate: {
      nome?: string;
      descricao?: string;
      data?: Date;
      duracao?: number;
      exercicios?: {
        id: string;
        nome: string;
      }[];
    } = { nome, descricao, data, duracao };

    if (exercicios) {
      // Ensure each exercise has all required fields
      const validExercicios = exercicios.filter(exercicio => 
        exercicio.id && exercicio.nome
      );

      if (validExercicios.length > 0) {
        dataToUpdate.exercicios = validExercicios.map(exercicio => ({
          id: exercicio.id!,
          nome: exercicio.nome!,
        }));
      }
    }

    return this.treinoRepository.update(id, dataToUpdate);
  }

  async deleteTreino(id: string): Promise<Treino | null> {
    return this.treinoRepository.delete(id);
  }

  async addExerciciosToTreino(treinoId: string, exercicios: {
    nome: string;
  }[]): Promise<Treino | null> {
    const treino = await this.treinoRepository.findById(treinoId);
    if (!treino) return null;

    for (const exercicio of exercicios) {
      await this.exercicioRepository.save({
        ...exercicio,
        treinoId,
      });
    }

    return this.treinoRepository.findById(treinoId);
  }
}



