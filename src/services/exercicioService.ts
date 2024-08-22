import { ExercicioRepository } from "../repositories/exercicioRepository";

export class ExercicioService {
  private exercicioRepository: ExercicioRepository;

  constructor() {
    this.exercicioRepository = new ExercicioRepository();
  }

  async getAllExercicios() {
    return this.exercicioRepository.findAll();
  }

  async getExercicioById(id: string) {
    return this.exercicioRepository.findById(id);
  }

  async createExercicio(exercicioData: {
    nome: string;
    duracao: number;
    descanso: number;
    treinoId: string;
  }) {
    return this.exercicioRepository.save(exercicioData);
  }

  async updateExercicio(id: string, exercicioData: {
    nome?: string;
    duracao?: number;
    descanso?: number;
  }) {
    return this.exercicioRepository.update(id, exercicioData);
  }

  async deleteExercicio(id: string) {
    return this.exercicioRepository.delete(id);
  }
}
