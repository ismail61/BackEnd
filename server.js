const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
require('./require/database')
const PORT = process.env.PORT || 4444
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use(passport.initialize())
require('./Auth/Passport/passport')(passport)

require('./routes/routes')(app)
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
    
})