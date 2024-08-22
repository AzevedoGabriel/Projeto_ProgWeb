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
exports.ProfessorRepository = void 0;
const client_1 = require("@prisma/client");
class ProfessorRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.professor.findMany({
                include: { alunos: true }, // Inclui os alunos associados ao professor
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.professor.findUnique({
                where: { id },
                include: { alunos: true }, // Inclui os alunos associados ao professor
            });
        });
    }
    save(professor) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.professor.create({
                data: professor,
            });
        });
    }
    update(id, updatedProfessor) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.professor.update({
                where: { id },
                data: updatedProfessor,
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.professor.delete({
                where: { id },
            });
        });
    }
}
exports.ProfessorRepository = ProfessorRepository;
