"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exercicioController_1 = require("../controllers/exercicioController");
const router = (0, express_1.Router)();
const exercicioController = new exercicioController_1.ExercicioController();
router.get("/exercicios", exercicioController.getExercicios);
router.get("/exercicios/:id", exercicioController.getExercicioById);
router.post("/exercicios", exercicioController.createExercicio);
router.put("/exercicios/:id", exercicioController.updateExercicio);
router.delete("/exercicios/:id", exercicioController.deleteExercicio);
exports.default = router;
