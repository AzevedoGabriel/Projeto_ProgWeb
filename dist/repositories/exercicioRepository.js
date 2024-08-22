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
exports.ExercicioRepository = void 0;
const client_1 = require("@prisma/client");
class ExercicioRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.exercicio.findMany({
                include: { treino: true }, // Inclui o treino associado
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.exercicio.findUnique({
                where: { id },
                include: { treino: true }, // Inclui o treino associado
            });
        });
    }
    save(exercicio) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.exercicio.create({
                data: exercicio,
            });
        });
    }
    update(id, updatedExercicio) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.exercicio.update({
                where: { id },
                data: updatedExercicio,
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.exercicio.delete({
                where: { id },
            });
        });
    }
}
exports.ExercicioRepository = ExercicioRepository;
