import { Router } from "express";
import { AlunoController } from "../controllers/alunoController";

const router = Router();
const alunoController = new AlunoController();

router.get("/alunos", alunoController.getAlunos);
router.post("/alunos", alunoController.createAluno);
router.put("/alunos/:id", alunoController.updateAluno);
router.delete("/alunos/:id", alunoController.deleteAluno);

router.post("/alunos/assign-professor", alunoController.assignProfessor);

export default router;
