const express = require('express')
const router = express.Router()
const {Rezervacija} = require('../models/booking')

router.get('/', async(req, res) => {
    try{
        const rezervacije = await Rezervacija.find();
        res.json(rezervacije)
    }catch(err){
        res.json({message: err.message})
    }
})

router.get('/:id', async (req, res)=>{
    const id = req.params.id;
    const query = { id: id };
    try{
        const rezervacija = await Rezervacija.findOne(query);
        res.json(rezervacija)
    }catch(err){
        res.json({message: err.message})
    }
})

router.post('/', (req, res) => {
    let newRez = new Rezervacija({
        datumPrijave: req.body.datumPrijave,
        datumOdjave: req.body.datumOdjave,
        brojOsoba: req.body.brojOsoba,
        smjestej: req.body.smjestaj
    })
    newRez.save((err, doc)=>{
        if(!err){ res.send(doc)}
        else{
            console.log('Error:' + JSON.stringify(err, undefined, 2))
        }
    })
})

router.put('/:id', (req, res) => {
    let rez = {
        datumPrijave: req.body.datumPrijave,
        datumOdjave: req.body.datumOdjave,
        brojOsoba: req.body.brojOsoba,
        smjestej: req.body.smjestej
    }
    Rezervacija.findByIdAndUpdate(req.params.id, { $set: rez }, {new: true}, (err, doc) => {
        if(!err){
            res.send(doc)
        }else{
            console.log('Error:' + JSON.stringify(err, undefined, 2))
        }
    })
})

router.delete('/:id', (req, res) => {
    try{
        Rezervacija.findByIdAndDelete(req.params.id, (err, doc) => {
            if(!err){
                res.send(doc)
            }else{
                console.log('Error:' + JSON.stringify(err, undefined, 2))
            }
        })
    }catch(err){
        res.json({message: err.message})
    }
})

module.exports = router
