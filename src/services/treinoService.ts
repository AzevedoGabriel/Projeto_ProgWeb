import { TreinoRepository } from "../repositories/treinoRepository";
import { Treino } from "@prisma/client";

export class TreinoService {
  private treinoRepository = new TreinoRepository();

  async getAllTreinos(): Promise<Treino[]> {
    return this.treinoRepository.getAllTreinos();
  }

  async getTreinoById(id: string): Promise<Treino | null> {
    return this.treinoRepository.getTreinoById(id);
  }

  async createTreino(data: Omit<Treino, "id">): Promise<Treino> {
    return this.treinoRepository.createTreino(data);
  }

  async updateTreino(
    id: string,
    data: Partial<Treino>
  ): Promise<Treino | null> {
    return this.treinoRepository.updateTreino(id, data);
  }

  async deleteTreino(id: string): Promise<Treino | null> {
    return this.treinoRepository.deleteTreino(id);
  }
}
