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
exports.ProfessorService = void 0;
const professorRepository_1 = require("../repositories/professorRepository");
class ProfessorService {
    constructor() {
        this.professorRepository = new professorRepository_1.ProfessorRepository();
    }
    getAllProfessores() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.professorRepository.findAll();
        });
    }
    getProfessorById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.professorRepository.findById(id);
        });
    }
    createProfessor(professor) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.professorRepository.save(professor);
        });
    }
    updateProfessor(id, updatedProfessor) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.professorRepository.update(id, updatedProfessor);
        });
    }
    deleteProfessor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.professorRepository.delete(id);
        });
    }
}
exports.ProfessorService = ProfessorService;
