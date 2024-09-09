const request = require("supertest");
const { PrismaClient } = require("@prisma/client");
const { app, server } = require("../src/server");

const prisma = new PrismaClient();
let token;

beforeAll(async () => {
  await prisma.$connect();

  const registerResponse = await request(app).post("/register-aluno").send({
    matricula: "20220001",
    name: "João Silva",
    idade: 21,
    senha: "123456",
  });

  token = registerResponse.body.token;
  if (!token) {
    throw new Error("Token não foi gerado");
  }
});

beforeEach(async () => {
  await prisma.aluno.deleteMany({});
  await request(app).post("/register-aluno").send({
    matricula: "20220001",
    name: "João Silva",
    idade: 21,
    senha: "123456",
  });
});

afterEach(async () => {
  await prisma.aluno.deleteMany({});
});

afterAll(async () => {
  await prisma.$disconnect();
  server.close();
});

describe("GET /alunos", () => {
  it("Deve retornar a lista de alunos", async () => {
    const response = await request(app)
      .get("/alunos")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("matricula", "20220001");
  });

  it("Deve retornar um erro 404 se nenhum aluno existir", async () => {
    await prisma.aluno.deleteMany({});
    const response = await request(app)
      .get("/alunos")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Nenhum aluno encontrado" });
  });
});

describe("POST /alunos", () => {
  it("Deve criar um novo aluno", async () => {
    const novoAluno = {
      matricula: "20220002",
      name: "Maria Souza",
      idade: 22,
      senha: "654321",
    };

    const response = await request(app)
      .post("/alunos")
      .send(novoAluno)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("matricula", "20220002");
    expect(response.body).toHaveProperty("name", "Maria Souza");
  });

  it("Não deve criar um aluno com dados incompletos", async () => {
    const alunoInvalido = {
      matricula: "20220003",
      name: "Carlos Pereira",
      // Faltando idade e senha
    };

    const response = await request(app)
      .post("/alunos")
      .send(alunoInvalido)
      .set("Authorization", `Bearer ${token}`); 

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Dados incompletos" });
  });
});

describe("PATCH /alunos/:id", () => {
  it("Deve atualizar os dados de um aluno existente", async () => {
    const alunoExistente = await prisma.aluno.findFirst();

    const response = await request(app)
      .patch(`/alunos/${alunoExistente?.id}`)
      .send({ name: "João Pedro", idade: 22 })
      .set("Authorization", `Bearer ${token}`); 

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "João Pedro");
  });

  it("Deve retornar erro ao tentar atualizar um aluno que não existe", async () => {
    const response = await request(app)
      .patch("/alunos/999")
      .send({ name: "Nome Inexistente" })
      .set("Authorization", `Bearer ${token}`); 

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Aluno não encontrado" });
  });
});

describe("DELETE /alunos/:id", () => {
  it("Deve deletar um aluno existente", async () => {
    const alunoExistente = await prisma.aluno.findFirst();

    const response = await request(app)
      .delete(`/alunos/${alunoExistente?.id}`)
      .set("Authorization", `Bearer ${token}`); 
    expect(response.status).toBe(204);
  });

  it("Deve retornar erro ao tentar deletar um aluno que não existe", async () => {
    const response = await request(app)
      .delete("/alunos/999")
      .set("Authorization", `Bearer ${token}`); 

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Aluno não encontrado" });
  });
});
