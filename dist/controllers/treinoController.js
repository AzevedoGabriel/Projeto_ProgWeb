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
exports.TreinoController = void 0;
const treinoService_1 = require("../services/treinoService");
class TreinoController {
    constructor() {
        this.getTreinos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const treinos = yield this.treinoService.getAllTreinos();
                res.json(treinos);
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao buscar treinos" });
            }
        });
        this.getTreinoById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const treino = yield this.treinoService.getTreinoById(id);
                if (!treino) {
                    return res.status(404).json({ message: "Treino não encontrado" });
                }
                res.json(treino);
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao buscar treino" });
            }
        });
        this.createTreino = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nome, descricao, data, duracao, exercicios } = req.body;
            if (!nome || !data || duracao === undefined) {
                return res.status(400).json({ message: "Dados incompletos" });
            }
            try {
                const novoTreino = yield this.treinoService.createTreino({
                    nome,
                    descricao,
                    data,
                    duracao,
                    exercicios,
                });
                res.status(201).json(novoTreino);
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao criar treino" });
            }
        });
        this.updateTreino = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { nome, descricao, data, duracao, exercicios } = req.body;
            try {
                const updatedTreino = yield this.treinoService.updateTreino(id, {
                    nome,
                    descricao,
                    data,
                    duracao,
                    exercicios,
                });
                if (!updatedTreino) {
                    return res.status(404).json({ message: "Treino não encontrado" });
                }
                res.json(updatedTreino);
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao atualizar treino" });
            }
        });
        this.deleteTreino = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const deletedTreino = yield this.treinoService.deleteTreino(id);
                if (!deletedTreino) {
                    return res.status(404).json({ message: "Treino não encontrado" });
                }
                res.json({ message: "Treino deletado com sucesso" });
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao deletar treino" });
            }
        });
        this.calculateTreinoDuration = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const totalDuration = yield this.treinoService.calculateTotalDuration(id);
                res.json({ totalDuration });
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao calcular duração do treino" });
            }
        });
        this.treinoService = new treinoService_1.TreinoService();
    }
}
exports.TreinoController = TreinoController;
