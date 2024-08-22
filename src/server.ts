import express from "express"
import alunoRoutes from "./routes/alunoRoutes"
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from './schemas/schemas.json'

const app = express()
const port = 3000;

const swaggerJsDoc = require("swagger-jsdoc");

var swaggerDefinition = {
  info: {
      title: "API KyoGym",
      version: "1.0.0",
      description: "Documentação da API KyoGym",
  },
  components: {
      schemas: require("./schemas/schemas.json")
  }
}

var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ["./routes/alunoRoutes.ts"]
}

var swaggerSpec = swaggerJsDoc(options);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(express.json())
app.use(alunoRoutes)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
