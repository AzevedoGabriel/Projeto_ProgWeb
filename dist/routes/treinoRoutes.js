"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const treinoController_1 = require("../controllers/treinoController");
const router = (0, express_1.Router)();
const treinoController = new treinoController_1.TreinoController();
router.get("/treinos", treinoController.getTreinos);
router.get("/treinos/:id", treinoController.getTreinoById);
router.post("/treinos", treinoController.createTreino);
router.put("/treinos/:id", treinoController.updateTreino);
router.delete("/treinos/:id", treinoController.deleteTreino);
router.get("/treinos/:id/duracao", treinoController.calculateTreinoDuration);
exports.default = router;
