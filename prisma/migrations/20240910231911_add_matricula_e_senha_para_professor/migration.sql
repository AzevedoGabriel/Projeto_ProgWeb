/*
  Warnings:

  - Added the required column `matricula` to the `Professor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Professor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Professor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matricula" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "senha" TEXT NOT NULL
);
INSERT INTO "new_Professor" ("id", "idade", "nome") SELECT "id", "idade", "nome" FROM "Professor";
DROP TABLE "Professor";
ALTER TABLE "new_Professor" RENAME TO "Professor";
CREATE UNIQUE INDEX "Professor_matricula_key" ON "Professor"("matricula");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
