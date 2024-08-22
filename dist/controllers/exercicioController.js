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
exports.ExercicioController = void 0;
const treinoService_1 = require("../services/treinoService");
class ExercicioController {
    constructor() {
        this.getExercicios = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const exercicios = yield this.exercicioService.getAllExercicios();
                res.json(exercicios);
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao buscar exercícios" });
            }
        });
        this.getExercicioById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const exercicio = yield this.exercicioService.getExercicioById(id);
                if (!exercicio) {
                    return res.status(404).json({ message: "Exercício não encontrado" });
                }
                res.json(exercicio);
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao buscar exercício" });
            }
        });
        this.createExercicio = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nome, duracao, descanso, treinoId } = req.body;
            if (!nome || duracao === undefined || descanso === undefined || !treinoId) {
                return res.status(400).json({ message: "Dados incompletos" });
            }
            try {
                const novoExercicio = yield this.exercicioService.createExercicio({
                    nome,
                    duracao,
                    descanso,
                    treinoId,
                });
                res.status(201).json(novoExercicio);
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao criar exercício" });
            }
        });
        this.updateExercicio = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { nome, duracao, descanso, treinoId } = req.body;
            try {
                const updatedExercicio = yield this.exercicioService.updateExercicio(id, {
                    nome,
                    duracao,
                    descanso,
                    treinoId,
                });
                if (!updatedExercicio) {
                    return res.status(404).json({ message: "Exercício não encontrado" });
                }
                res.json(updatedExercicio);
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao atualizar exercício" });
            }
        });
        this.deleteExercicio = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const deletedExercicio = yield this.exercicioService.deleteExercicio(id);
                if (!deletedExercicio) {
                    return res.status(404).json({ message: "Exercício não encontrado" });
                }
                res.json({ message: "Exercício deletado com sucesso" });
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao deletar exercício" });
            }
        });
        this.exercicioService = new treinoService_1.ExercicioService();
    }
}
exports.ExercicioController = ExercicioController;
