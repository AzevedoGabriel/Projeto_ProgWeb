import { Professor } from "@prisma/client";
import { ProfessorRepository } from "../repositories/professorRepository";

export class ProfessorService {
  private professorRepository: ProfessorRepository;

  constructor() {
    this.professorRepository = new ProfessorRepository();
  }

  async getAllProfessores(): Promise<Professor[]> {
    return this.professorRepository.findAll();
  }

  async getProfessorById(id: string): Promise<Professor | null> {
    return this.professorRepository.findById(id);
  }

  async createProfessor(professor: Omit<Professor, "id">): Promise<Professor> {
    return this.professorRepository.save(professor);
  }

  async updateProfessor(
    id: string,
    updatedProfessor: Partial<Professor>
  ): Promise<Professor | null> {
    return this.professorRepository.update(id, updatedProfessor);
  }

  async deleteProfessor(id: string): Promise<Professor | null> {
    return this.professorRepository.delete(id);
  }
}
