import express from "express"
import alunoRoutes from "./routes/alunoRoutes"
import professorRoutes from './routes/professorRoutes'
import exercicioRoutes from './routes/exercicioRoutes'
import treinoRoutes from './routes/treinoRoutes'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from './schemas/schemas.json'

const app = express()
const port = 3000;

const cors = require('cors');
app.use(cors());


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
app.use(professorRoutes)
app.use(exercicioRoutes)
app.use(treinoRoutes)

const server = app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})

export { app, server };