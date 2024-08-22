import { Exercicio } from "@prisma/client";
import { ExercicioRepository } from "../repositories/exercicioRepository";

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
