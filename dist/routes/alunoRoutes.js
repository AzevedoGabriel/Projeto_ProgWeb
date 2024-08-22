"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alunoController_1 = require("../controllers/alunoController");
const router = (0, express_1.Router)();
const alunoController = new alunoController_1.AlunoController();
router.get("/alunos", alunoController.getAlunos);
router.post("/alunos", alunoController.createAluno);
router.put("/alunos/:id", alunoController.updateAluno);
router.delete("/alunos/:id", alunoController.deleteAluno);
router.post("/alunos/assign-professor", alunoController.assignProfessor);
exports.default = router;
