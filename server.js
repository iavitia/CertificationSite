import dotenv from 'dotenv'
import express from 'express'
import 'express-async-errors'
// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
// db
import connectDB from './db/connect.js'
// routers
import authRouter from './routes/authRoutes.js'
import questionRouter from './routes/questionRoutes.js'

dotenv.config()
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome' })
})

app.get('/api/v1', (req, res) => {
  res.json({ msg: 'API' })
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/questions', questionRouter)

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
