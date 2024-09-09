import { Router } from "express";
import { TreinoController } from "../controllers/treinoController";

const router = Router();
const treinoController = new TreinoController();

router.get("/treinos", treinoController.getTreinos);
router.get("/treinos/:id", treinoController.getTreinoById);
router.post("/treinos", treinoController.createTreino);
router.put("/treinos/:id", treinoController.updateTreino);
router.delete("/treinos/:id", treinoController.deleteTreino);

export default router;
