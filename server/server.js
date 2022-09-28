const express = require('express')
const mongoose = require('mongoose')
const bodyPasere = require('body-parser')
const config = require('./config/db')
const cors = require('cors')

//Povezivanje na bazu
mongoose.connect(config.database)

//Povezano 
mongoose.connection.on('connected', () =>{
    console.log('Connected to MondoDB');
}); 

const app = express()

const rezervacije = require('./routes/bookingController')

app.use(cors())
app.use(bodyPasere.json());
app.use('/rezervacije', rezervacije);

app.listen(3000)