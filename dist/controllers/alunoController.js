"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlunoController = void 0;
const alunoService_1 = require("../services/alunoService");
class AlunoController {
    constructor() {
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
         *                 $ref: '#/components/schemas/Aluno'
         *       500:
         *         description: Internal server error
         */
        this.getAlunos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const alunos = yield this.alunoService.getAllAlunos();
                res.json(alunos);
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao buscar alunos" });
            }
        });
        this.createAluno = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { matricula, name, idade, professorId } = req.body;
            if (!matricula || !name || !idade) {
                return res.status(400).json({ message: "Dados incompletos" });
            }
            try {
                const novoAluno = yield this.alunoService.createAluno({
                    matricula,
                    name,
                    idade,
                    professorId, // Opcional, pode ser nulo
                });
                res.status(201).json(novoAluno);
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao criar aluno" });
            }
        });
        this.updateAluno = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { name, idade, professorId } = req.body;
            try {
                const updatedAluno = yield this.alunoService.updateAluno(id, {
                    name,
                    idade,
                    professorId, // Pode ser passado para alterar o professor
                });
                if (!updatedAluno) {
                    return res.status(404).json({ message: "Aluno não encontrado" });
                }
                res.json(updatedAluno);
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao atualizar aluno" });
            }
        });
        this.deleteAluno = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const deletedAluno = yield this.alunoService.deleteAluno(id);
                if (!deletedAluno) {
                    return res.status(404).json({ message: "Aluno não encontrado" });
                }
                res.json({ message: "Aluno deletado com sucesso" });
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao deletar aluno" });
            }
        });
        this.assignProfessor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { alunoId, professorId } = req.body;
            try {
                const aluno = yield this.alunoService.assignProfessorToAluno(alunoId, professorId);
                if (!aluno) {
                    return res
                        .status(404)
                        .json({ message: "Aluno ou professor não encontrado" });
                }
                res.json(aluno);
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao atribuir professor ao aluno" });
            }
        });
        this.alunoService = new alunoService_1.AlunoService();
    }
}
exports.AlunoController = AlunoController;
