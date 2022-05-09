import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()

import 'express-async-errors'
import morgan from 'morgan'
// db
import connectDB from './db/connect.js'
// routers
import authRouter from './routes/authRoutes.js'
import questionRouter from './routes/questionRoutes.js'
// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'

app.use(express.json())

if (process.env.NODE_ENV) {
  app.use(morgan('dev'))
}

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome' })
})

app.get('/api/v1', (req, res) => {
  res.json({ msg: 'API' })
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/questions', authenticateUser, questionRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
