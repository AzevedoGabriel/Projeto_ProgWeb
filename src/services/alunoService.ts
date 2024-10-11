import { Aluno } from "@prisma/client";
import { AlunoRepository } from "../repositories/alunoRepository";

export class AlunoService {
  private alunoRepository: AlunoRepository;

  constructor() {
    this.alunoRepository = new AlunoRepository();
  }

  async getAllAlunos(): Promise<Aluno[]> {
    return this.alunoRepository.findAll();
  }

  async getAlunoById(id: string): Promise<Aluno | null> {
    return this.alunoRepository.findById(id);
  }

  async createAluno(aluno: Omit<Aluno, "id">): Promise<Aluno> {
    return this.alunoRepository.save(aluno);
  }
  
  async updateAluno(
    id: string,
    updatedAluno: Partial<Aluno>
  ): Promise<Aluno | null> {
    return this.alunoRepository.update(id, updatedAluno);
  }

  async deleteAluno(id: string): Promise<Aluno | null> {
    return this.alunoRepository.delete(id);
  }

  /**
  async assignProfessorToAluno(
    alunoId: string
  ): Promise<Aluno | null> {
    return this.alunoRepository.update(alunoId);
  }
     */
}
