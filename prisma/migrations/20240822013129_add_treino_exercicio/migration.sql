-- CreateTable
CREATE TABLE "Treino" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "data" DATETIME NOT NULL,
    "duracao" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Exercicio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "duracao" INTEGER NOT NULL,
    "descanso" INTEGER NOT NULL,
    "treinoId" TEXT NOT NULL,
    CONSTRAINT "Exercicio_treinoId_fkey" FOREIGN KEY ("treinoId") REFERENCES "Treino" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
