import express from "express"
import alunoRoutes from "./routes/alunoRoutes"

const app = express()
const port = 3000;

app.use(express.json())
app.use(alunoRoutes)

app.get("/", (req, res) => {
  res.send("Hello, world!")
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
