-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exercicio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "treinoId" TEXT
);
INSERT INTO "new_Exercicio" ("id", "nome", "treinoId") SELECT "id", "nome", "treinoId" FROM "Exercicio";
DROP TABLE "Exercicio";
ALTER TABLE "new_Exercicio" RENAME TO "Exercicio";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
