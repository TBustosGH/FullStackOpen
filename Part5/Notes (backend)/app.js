const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware') 
const logger = require('./utils/logger')
const mongoose = require('mongoose')



mongoose.set('strictQuery', false)

logger.info('Connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDB')
    })
    .catch(error => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

/*
For some reason the App crashes when I try to run "npm run start:test", so I decided to configure the app manually.
So, everytime I had to make tests, I'd have to change the "config.MONGODB_URI" var, in config.js to its test value
& change the boolean value of this if statement to true.
DO NOT FORGET: change this if statement (right below this commentary) to false, and "config.MONGODB_URI" var to 
its production value when quit testing.
*/

if (false) {
    logger.info('Testing...\n')
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app