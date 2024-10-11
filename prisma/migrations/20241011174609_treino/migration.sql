/*
  Warnings:

  - You are about to drop the column `data` on the `Treino` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Treino" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "duracao" INTEGER NOT NULL
);
INSERT INTO "new_Treino" ("descricao", "duracao", "id", "nome") SELECT "descricao", "duracao", "id", "nome" FROM "Treino";
DROP TABLE "Treino";
ALTER TABLE "new_Treino" RENAME TO "Treino";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
