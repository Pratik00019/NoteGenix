const connecttomongo=require('./db')

const express = require('express')
const cors = require('cors');

const app = express()
const port = process.env.PORT || 5000


app.use(cors());

//Middleware

app.use(express.json());


// Routes

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

connecttomongo();