"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const alunoRoutes_1 = __importDefault(require("./routes/alunoRoutes"));
const app = (0, express_1.default)();
const port = 3000;
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
var swaggerDefinition = {
    info: {
        title: "API KyoGym",
        version: "1.0.0",
        description: "Documentação da API KyoGym",
    },
    components: {
        schemas: require("./schemas.json")
    }
};
var options = {
    swaggerDefinition: swaggerDefinition,
    apis: ["./routes/alunoRoutes.tsx"]
};
var swaggerSpec = swaggerJsDoc(options);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(express_1.default.json());
app.use(alunoRoutes_1.default);
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
