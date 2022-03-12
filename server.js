import dotenv from 'dotenv'
import express from 'express'
// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorhandlerMiddleware from './middleware/error-handler.js'

dotenv.config()
const app = express()

app.get('/', (req, res) => {
  res.send('Welcome')
})

app.use(notFoundMiddleware)
app.use(errorhandlerMiddleware)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
