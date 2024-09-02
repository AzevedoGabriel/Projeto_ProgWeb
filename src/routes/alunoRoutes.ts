import { Router } from "express";
import { AlunoController } from "../controllers/alunoController";
import { registerAluno, loginAluno } from "../services/authService";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();
const alunoController = new AlunoController();

router.get("/alunos", authMiddleware, alunoController.getAlunos);
router.post("/alunos", authMiddleware, alunoController.createAluno);
router.put("/alunos/:id", authMiddleware, alunoController.updateAluno);
router.delete("/alunos/:id", authMiddleware, alunoController.deleteAluno);

router.post(
  "/alunos/assign-professor",
  authMiddleware,
  alunoController.assignProfessor
);

router.post("/register-aluno", async (req, res) => {
  try {
    const { matricula, name, idade, senha } = req.body;
    const token = await registerAluno(matricula, name, idade, senha);
    res.json({ token });
  } catch (error) {
    const err = error as Error;
    console.error(err.message); 
    res.status(400).json({ message: err.message });
  }
});

router.post("/login-aluno", async (req, res) => {
  try {
    const { matricula, senha } = req.body;
    const token = await loginAluno(matricula, senha);
    res.json({ token });
  } catch (error) {
    const err = error as Error;
    console.error(err.message); 
    res.status(400).json({ error: err.message });
  }
});

export default router;
