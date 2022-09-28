const mongoose = require('mongoose')

var Rezervacija = mongoose.model('Rezervacija', {
    datumPrijave: {type: String},
    datumOdjave: {type: String},
    brojOsoba: {type: Number},
    smjestej: {type: String}
})

module.exports = {Rezervacija}  