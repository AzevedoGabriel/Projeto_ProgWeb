import { Router } from "express";
import { AlunoController } from "../controllers/alunoController"

const router = Router();
const alunoController = new AlunoController();

router.get("/alunos", alunoController.getAlunos);
router.post("/alunos", alunoController.createAluno);
router.put("/alunos/:id", alunoController.updateAluno);

export default router;
