require('dotenv').config()

const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors")

const testModel = require('./models/test.js')
/*const aiReceiver = require('./models/aiReceiver.js')*/
const tts = require('./models/tts.js')
const rapidAPI = require('./models/rapidAPI.js')
const app = express()
const port = 3000

app.use(cors({
    credentials: true,
    origin: true,
}))

app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static('public'))

app.use('/test', testModel)
/*app.use('/aichat', aiReceiver)*/
app.use('/tts', tts)
app.use('/rapidAPI', rapidAPI)
app.use(express.static('public'))
app.use('/audio.mp3',express.static('audio.mp3'))


app.listen(port, ()=>{
    console.log("Running at "+port)
})
