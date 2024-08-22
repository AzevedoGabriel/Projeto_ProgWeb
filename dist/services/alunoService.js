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
exports.AlunoService = void 0;
const alunoRepository_1 = require("../repositories/alunoRepository");
class AlunoService {
    constructor() {
        this.alunoRepository = new alunoRepository_1.AlunoRepository();
    }
    getAllAlunos() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.alunoRepository.findAll();
        });
    }
    getAlunoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.alunoRepository.findById(id);
        });
    }
    createAluno(aluno) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.alunoRepository.save(aluno);
        });
    }
    updateAluno(id, updatedAluno) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.alunoRepository.update(id, updatedAluno);
        });
    }
    deleteAluno(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.alunoRepository.delete(id);
        });
    }
    assignProfessorToAluno(alunoId, professorId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.alunoRepository.update(alunoId, { professorId });
        });
    }
}
exports.AlunoService = AlunoService;
