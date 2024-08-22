import { Exercicio, Treino } from "@prisma/client";
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

  async createTreino(treino: Omit<Treino, "id">): Promise<Treino> {
    return this.treinoRepository.save(treino);
  }

  async updateTreino(
    id: string,
    updatedTreino: Partial<Treino>
  ): Promise<Treino | null> {
    return this.treinoRepository.update(id, updatedTreino);
  }

  async deleteTreino(id: string): Promise<Treino | null> {
    return this.treinoRepository.delete(id);
  }

  async calculateTotalDuration(treinoId: string): Promise<number> {
    const treino = await this.treinoRepository.findById(treinoId);
    if (!treino) return 0;

    const exercicios = treino.exercicios;
    const totalDuration = exercicios.reduce((acc: any, exercicio: { duracao: any; descanso: any; }) => {
      return acc + exercicio.duracao + exercicio.descanso;
    }, 0);

    return totalDuration;
  }
}

export class ExercicioService {
  private exercicioRepository: ExercicioRepository;

  constructor() {
    this.exercicioRepository = new ExercicioRepository();
  }

  async getAllExercicios(): Promise<Exercicio[]> {
    return this.exercicioRepository.findAll();
  }

  async getExercicioById(id: string): Promise<Exercicio | null> {
    return this.exercicioRepository.findById(id);
  }

  async createExercicio(exercicio: Omit<Exercicio, "id">): Promise<Exercicio> {
    return this.exercicioRepository.save(exercicio);
  }

  async updateExercicio(
    id: string,
    updatedExercicio: Partial<Exercicio>
  ): Promise<Exercicio | null> {
    return this.exercicioRepository.update(id, updatedExercicio);
  }

  async deleteExercicio(id: string): Promise<Exercicio | null> {
    return this.exercicioRepository.delete(id);
  }
}
