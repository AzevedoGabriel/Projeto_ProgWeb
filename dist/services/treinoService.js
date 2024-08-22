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
exports.ExercicioService = exports.TreinoService = void 0;
const treinoRepository_1 = require("../repositories/treinoRepository");
const exercicioRepository_1 = require("../repositories/exercicioRepository");
class TreinoService {
    constructor() {
        this.treinoRepository = new treinoRepository_1.TreinoRepository();
        this.exercicioRepository = new exercicioRepository_1.ExercicioRepository();
    }
    getAllTreinos() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.treinoRepository.findAll();
        });
    }
    getTreinoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.treinoRepository.findById(id);
        });
    }
    createTreino(treino) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.treinoRepository.save(treino);
        });
    }
    updateTreino(id, updatedTreino) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.treinoRepository.update(id, updatedTreino);
        });
    }
    deleteTreino(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.treinoRepository.delete(id);
        });
    }
    calculateTotalDuration(treinoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const treino = yield this.treinoRepository.findById(treinoId);
            if (!treino)
                return 0;
            const exercicios = treino.exercicios;
            const totalDuration = exercicios.reduce((acc, exercicio) => {
                return acc + exercicio.duracao + exercicio.descanso;
            }, 0);
            return totalDuration;
        });
    }
}
exports.TreinoService = TreinoService;
class ExercicioService {
    constructor() {
        this.exercicioRepository = new exercicioRepository_1.ExercicioRepository();
    }
    getAllExercicios() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exercicioRepository.findAll();
        });
    }
    getExercicioById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exercicioRepository.findById(id);
        });
    }
    createExercicio(exercicio) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exercicioRepository.save(exercicio);
        });
    }
    updateExercicio(id, updatedExercicio) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exercicioRepository.update(id, updatedExercicio);
        });
    }
    deleteExercicio(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exercicioRepository.delete(id);
        });
    }
}
exports.ExercicioService = ExercicioService;
