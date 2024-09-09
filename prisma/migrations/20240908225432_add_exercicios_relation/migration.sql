/*
  Warnings:

  - You are about to drop the column `descanso` on the `Exercicio` table. All the data in the column will be lost.
  - You are about to drop the column `duracao` on the `Exercicio` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exercicio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "treinoId" TEXT,
    CONSTRAINT "Exercicio_treinoId_fkey" FOREIGN KEY ("treinoId") REFERENCES "Treino" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Exercicio" ("id", "nome", "treinoId") SELECT "id", "nome", "treinoId" FROM "Exercicio";
DROP TABLE "Exercicio";
ALTER TABLE "new_Exercicio" RENAME TO "Exercicio";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
