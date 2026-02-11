
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'

import simulationRoutes from './routes/simulation.routes.js'
import localitaRoutes from './routes/localita.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// ROUTES
app.use('/api', simulationRoutes)
app.use('/api', localitaRoutes)

// ROOT
app.get('/', (req, res) => {
  res.json({ message: 'RF4 Simulation Backend' })
})

// CONNECT DB
const uri = process.env.MONGODB_URI
connectDB(uri)

// ⭐ esporta app per Jest
export default app

// ⭐ avvia server SOLO se eseguito direttamente
if (process.env.NODE_ENV !== 'test') {

  const PORT = process.env.PORT || 4000

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}




