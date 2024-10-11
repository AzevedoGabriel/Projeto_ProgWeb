import { Router } from "express";
import { TreinoController } from "../controllers/treinoController";

const router = Router();
const treinoController = new TreinoController();

router.get("/treinos", treinoController.getTreinos);
router.get("/treinos/:id", treinoController.getTreinoById);
router.post("/cadastra-treino", treinoController.createTreino);
router.put("/treinos/:id", treinoController.updateTreino);
router.delete("/delete-treino/:id", treinoController.deleteTreino);

export default router;
