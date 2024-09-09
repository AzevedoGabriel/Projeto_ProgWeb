-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exercicio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "duracao" INTEGER NOT NULL,
    "descanso" INTEGER NOT NULL,
    "treinoId" TEXT,
    CONSTRAINT "Exercicio_treinoId_fkey" FOREIGN KEY ("treinoId") REFERENCES "Treino" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Exercicio" ("descanso", "duracao", "id", "nome", "treinoId") SELECT "descanso", "duracao", "id", "nome", "treinoId" FROM "Exercicio";
DROP TABLE "Exercicio";
ALTER TABLE "new_Exercicio" RENAME TO "Exercicio";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
