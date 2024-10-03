import request from "supertest";
import { app } from "../src/server";
import { PrismaClient } from "@prisma/client";
import { ProfessorService } from "../src/services/professorService";

const prisma = new PrismaClient();
let token: string;

beforeAll(async () => {
  await prisma.$connect();

  const registerResponse = await request(app).post("/register-professor").send({
    matricula: "121212",
    nome: "Carlos Silva",
    idade: 40,
    senha: "123456"
  });

  token = registerResponse.body.token;
  if (!token) {
    throw new Error("Token não foi gerado");
  }
});

beforeEach(async () => {
  await prisma.professor.deleteMany({});
  await request(app).post("/register-professor").send({
    nome: "Carlos Silva",
    idade: 40,
  });
});

afterEach(async () => {
  await prisma.professor.deleteMany({});
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("GET /professores", () => {
  it("Deve retornar a lista de professores", async () => {
    const response = await request(app)
      .get("/professores")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("nome", "Carlos Silva");
  });

  it("Deve retornar um erro 500 se ocorrer um erro interno", async () => {
    jest
      .spyOn(ProfessorService.prototype, "getAllProfessores")
      .mockImplementation(() => {
        throw new Error("Erro interno");
      });

    const response = await request(app)
      .get("/professores")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Erro ao buscar professores" });
  });
});

describe("GET /professores/:id", () => {
  it("Deve retornar um professor pelo ID", async () => {
    const professor = await prisma.professor.findFirst();

    const response = await request(app)
      .get(`/professores/${professor?.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("nome", "Carlos Silva");
  });

  it("Deve retornar um erro 404 se o professor não existir", async () => {
    const response = await request(app)
      .get("/professores/999")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Professor não encontrado" });
  });
});

describe("POST /professores", () => {
  it("Deve criar um novo professor", async () => {
    const novoProfessor = {
      nome: "Ana Oliveira",
      idade: 35,
    };

    const response = await request(app)
      .post("/professores")
      .send(novoProfessor)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("nome", "Ana Oliveira");
  });

  it("Não deve criar um professor com dados incompletos", async () => {
    const professorInvalido = {
      nome: "Luis Almeida",
    };

    const response = await request(app)
      .post("/professores")
      .send(professorInvalido)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Dados incompletos" });
  });
});

describe("PUT /professores/:id", () => {
  it("Deve atualizar os dados de um professor existente", async () => {
    const professorExistente = await prisma.professor.findFirst();

    const response = await request(app)
      .put(`/professores/${professorExistente?.id}`)
      .send({ nome: "Carlos Silva Jr.", idade: 45 })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("nome", "Carlos Silva Jr.");
  });

  it("Deve retornar erro ao tentar atualizar um professor que não existe", async () => {
    const response = await request(app)
      .put("/professores/999")
      .send({ nome: "Nome Inexistente" })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Professor não encontrado" });
  });
});

describe("DELETE /professores/:id", () => {
  it("Deve deletar um professor existente", async () => {
    const professorExistente = await prisma.professor.findFirst();

    const response = await request(app)
      .delete(`/professores/${professorExistente?.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it("Deve retornar erro ao tentar deletar um professor que não existe", async () => {
    const response = await request(app)
      .delete("/professores/999")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Professor não encontrado" });
  });
});
