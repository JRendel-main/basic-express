const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const userRouter = require('./src/routes/userRouter')

const app = express()       
const PORT = 8000

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use('/api/v1', userRouter)

app.listen(PORT, () => {
    console.log("Server Running");
})