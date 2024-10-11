import { PrismaClient, Professor } from "@prisma/client";

export class ProfessorRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Professor[]> {
    return this.prisma.professor.findMany({});
  }

  async findById(id: string): Promise<Professor | null> {
    return this.prisma.professor.findUnique({
      where: { id }
    });
  }

  async save(professor: Omit<Professor, "id">): Promise<Professor> {
    return this.prisma.professor.create({
      data: professor,
    });
  }

  async update(
    id: string,
    updatedProfessor: Partial<Professor>
  ): Promise<Professor | null> {
    return this.prisma.professor.update({
      where: { id },
      data: updatedProfessor,
    });
  }

  async delete(id: string): Promise<Professor | null> {
    return this.prisma.professor.delete({
      where: { id },
    });
  }
}
