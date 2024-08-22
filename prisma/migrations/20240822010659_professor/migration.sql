-- CreateTable
CREATE TABLE "Professor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Aluno" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matricula" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "professorId" TEXT,
    CONSTRAINT "Aluno_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Aluno" ("id", "idade", "matricula", "name") SELECT "id", "idade", "matricula", "name" FROM "Aluno";
DROP TABLE "Aluno";
ALTER TABLE "new_Aluno" RENAME TO "Aluno";
CREATE UNIQUE INDEX "Aluno_matricula_key" ON "Aluno"("matricula");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
