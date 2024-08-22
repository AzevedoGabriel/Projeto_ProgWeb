import express from "express"
import alunoRoutes from "./routes/alunoRoutes"

const app = express()
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
}

var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ["./routes/alunoRoutes.tsx"]
}

var swaggerSpec = swaggerJsDoc(options);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(express.json())
app.use(alunoRoutes)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
