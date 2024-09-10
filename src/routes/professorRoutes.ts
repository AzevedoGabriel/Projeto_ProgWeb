import { Router } from "express";
import { ProfessorController } from "../controllers/professorController";

const router = Router();
const professorController = new ProfessorController();

router.get("/professores", professorController.getProfessores);
router.get("/professores/:id", professorController.getProfessorById);
router.post("/professores", professorController.createProfessor);
router.put("/professores/:id", professorController.updateProfessor);
router.delete("/professores/:id", professorController.deleteProfessor);

router.post("/register-professor", professorController.registerProfessor);
router.post("/login-professor", professorController.loginProfessor);

export default router;
