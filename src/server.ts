import express, { Request, Response } from 'express';


const app = express();
const port = 3000;


app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

let alunos: { id: number; nome: string; idade: number }[] = [
  { id: 1, nome: "João", idade: 20 },
  { id: 2, nome: "Maria", idade: 22 },
  { id: 3, nome: "Pedro", idade: 19 }
];

app.get('/alunos', (req: Request, res: Response) => {
  res.json(alunos);
});

app.post('/alunos', (req: Request, res: Response) => {
  const { id, nome, idade } = req.body;

  if (!id || !nome || !idade) {
    return res.status(400).json({ message: 'Dados incompletos' });
  }

  const novoAluno = { id, nome, idade };
  alunos.push(novoAluno);

  res.status(201).json(novoAluno);
});

app.put("/alunos/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { nome, idade } = req.body;

  const aluno = alunos.find((a) => a.id === id);

  if (!aluno) {
    return res.status(404).json({ message: "Aluno não encontrado" });
  }

  if (nome !== undefined) {
    aluno.nome = nome;
  }

  if (idade !== undefined) {
    aluno.idade = idade;
  }

  res.json(aluno);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
