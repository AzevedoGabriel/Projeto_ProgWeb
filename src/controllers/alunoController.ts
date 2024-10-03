import { Request, Response } from "express";
import { AlunoService } from "../services/alunoService";
import { loginAluno, registerAluno } from "../services/authService";
 import bcrypt from "bcrypt";

export class AlunoController {
  private alunoService: AlunoService;

  constructor() {
    this.alunoService = new AlunoService();
  }

public async registerAluno(req: Request, res: Response): Promise<void> {
  try {
    const { matricula, name, idade, senha } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);
    const token = await registerAluno(matricula, name, idade, hashedPassword);
    res.status(201).json({ token });
  } catch (error) {
    const err = error as Error;
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
}


  public async loginAluno(req: Request, res: Response): Promise<void> {
    try {
      const { matricula, senha } = req.body;
      const token = await loginAluno(matricula, senha);
      res.status(200).json({ token });
    } catch (error) {
      const err = error as Error;
      console.error(err.message);
      res.status(400).json({ message: err.message });
    }
  }

  /**
   * @swagger
   * /alunos:
   *   get:
   *     summary: Retrieve a list of all students
   *     tags:
   *       - Aluno
   *     responses:
   *       200:
   *         description: A list of students
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: './schemas/schemas.json#/Aluno'
   *       500:
   *         description: Internal server error
   */
  getAlunos = async (req: Request, res: Response) => {
    try {
      const alunos = await this.alunoService.getAllAlunos();

      if (alunos.length === 0) {
        return res.status(404).json({ message: "Nenhum aluno encontrado" });
      }

      res.json(
        alunos.map((aluno) => ({
          id: aluno.id,
          matricula: aluno.matricula,
          nome: aluno.name,
          senha: aluno.senha,
          professorId: aluno.professorId,
        }))
      );
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar alunos" });
    }
  };

  /**
   * @swagger
   * /alunos:
   *   post:
   *     summary: Create a new student
   *     tags:
   *       - Aluno
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: './schemas/schemas.json#/Aluno'
   *     responses:
   *       201:
   *         description: Student created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: './schemas/schemas.json#/Aluno'
   *       400:
   *         description: Invalid input
   *       500:
   *         description: Internal server error
   */
  createAluno = async (req: Request, res: Response) => {
    const { matricula, name, idade, senha, professorId } = req.body;
    if (!matricula || !name || !idade || !senha) {
      return res.status(400).json({ message: "Dados incompletos" });
    }
    try {
      const novoAluno = await this.alunoService.createAluno({
        matricula,
        name,
        idade,
        senha,
        professorId,
      });
      res.status(201).json(novoAluno);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar aluno" });
    }
  };

  /**
   * @swagger
   * /alunos/{id}:
   *   put:
   *     summary: Update an existing student
   *     tags:
   *       - Aluno
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of the student to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: './schemas/schemas.json#/Aluno'
   *     responses:
   *       200:
   *         description: Student updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: './schemas/schemas.json#/Aluno'
   *       404:
   *         description: Student not found
   *       500:
   *         description: Internal server error
   */
  updateAluno = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name, idade, professorId, senha } = req.body;
    try {
      const updatedAluno = await this.alunoService.updateAluno(id, {
        name,
        idade,
        professorId,
        senha,
      });
      if (!updatedAluno) {
        return res.status(404).json({ message: "Aluno não encontrado" });
      }
      res.json(updatedAluno);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar aluno" });
    }
  };
  /**
   * @swagger
   * /alunos/{id}:
   *   delete:
   *     summary: Delete a student
   *     tags:
   *       - Aluno
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of the student to delete
   *     responses:
   *       200:
   *         description: Student deleted successfully
   *       404:
   *         description: Student not found
   *       500:
   *         description: Internal server error
   */
  deleteAluno = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const deletedAluno = await this.alunoService.deleteAluno(id);
      if (!deletedAluno) {
        return res.status(404).json({ message: "Aluno não encontrado" });
      }
      res.status(204).json({ message: "Aluno deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar aluno" });
    }
  };

  /**
   * @swagger
   * /alunos/assign:
   *   post:
   *     summary: Assign a professor to a student
   *     tags:
   *       - Aluno
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               alunoId:
   *                 type: string
   *                 description: ID of the student
   *               professorId:
   *                 type: string
   *                 description: ID of the professor
   *     responses:
   *       200:
   *         description: Professor assigned successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: './schemas/schemas.json#/Aluno'
   *       404:
   *         description: Student or professor not found
   *       500:
   *         description: Internal server error
   */
  assignProfessor = async (req: Request, res: Response) => {
    const { alunoId, professorId } = req.body;

    try {
      const aluno = await this.alunoService.assignProfessorToAluno(
        alunoId,
        professorId
      );
      if (!aluno) {
        return res
          .status(404)
          .json({ message: "Aluno ou professor não encontrado" });
      }
      res.json(aluno);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atribuir professor ao aluno" });
    }
  };
}
