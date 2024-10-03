import { Router } from "express";
import { ExercicioController } from "../controllers/exercicioController";

const router = Router();
const exercicioController = new ExercicioController();

router.get("/exercicios", exercicioController.getExercicios);
router.get("/exercicios/:id", exercicioController.getExercicioById);
router.post("/cadastra-exercicio", exercicioController.createExercicio);
router.put("/exercicios/:id", exercicioController.updateExercicio);
router.delete("/exercicios/:id", exercicioController.deleteExercicio);

export default router;
