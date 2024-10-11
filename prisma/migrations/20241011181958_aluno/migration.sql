-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Aluno" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matricula" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);
INSERT INTO "new_Aluno" ("id", "idade", "matricula", "name", "senha") SELECT "id", "idade", "matricula", "name", "senha" FROM "Aluno";
DROP TABLE "Aluno";
ALTER TABLE "new_Aluno" RENAME TO "Aluno";
CREATE UNIQUE INDEX "Aluno_matricula_key" ON "Aluno"("matricula");
CREATE TABLE "new_Professor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matricula" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);
INSERT INTO "new_Professor" ("id", "idade", "matricula", "nome", "senha") SELECT "id", "idade", "matricula", "nome", "senha" FROM "Professor";
DROP TABLE "Professor";
ALTER TABLE "new_Professor" RENAME TO "Professor";
CREATE UNIQUE INDEX "Professor_matricula_key" ON "Professor"("matricula");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
