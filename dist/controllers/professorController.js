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
exports.ProfessorController = void 0;
const professorService_1 = require("../services/professorService");
class ProfessorController {
    constructor() {
        this.getProfessores = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const professores = yield this.professorService.getAllProfessores();
                res.json(professores);
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao buscar professores" });
            }
        });
        this.getProfessorById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const professor = yield this.professorService.getProfessorById(id);
                if (!professor) {
                    return res.status(404).json({ message: "Professor não encontrado" });
                }
                res.json(professor);
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao buscar professor" });
            }
        });
        this.createProfessor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nome, idade } = req.body;
            if (!nome || idade === undefined) {
                return res.status(400).json({ message: "Dados incompletos" });
            }
            try {
                const novoProfessor = yield this.professorService.createProfessor({
                    nome,
                    idade,
                });
                res.status(201).json(novoProfessor);
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao criar professor" });
            }
        });
        this.updateProfessor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { nome, idade } = req.body;
            try {
                const updatedProfessor = yield this.professorService.updateProfessor(id, {
                    nome,
                    idade,
                });
                if (!updatedProfessor) {
                    return res.status(404).json({ message: "Professor não encontrado" });
                }
                res.json(updatedProfessor);
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao atualizar professor" });
            }
        });
        this.deleteProfessor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const deletedProfessor = yield this.professorService.deleteProfessor(id);
                if (!deletedProfessor) {
                    return res.status(404).json({ message: "Professor não encontrado" });
                }
                res.json({ message: "Professor deletado com sucesso" });
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao deletar professor" });
            }
        });
        this.professorService = new professorService_1.ProfessorService();
    }
}
exports.ProfessorController = ProfessorController;
