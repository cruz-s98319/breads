const express = require('express')
const breads = express.Router()
const Bread = require('../models/breads.js')
const Baker = require('../models/baker.js')

// INDEX
breads.get('/', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      Bread.find()
      .then(foundBreads => {
        res.render('index', {
          breads: foundBreads,
          bakers: foundBakers,
          title: 'Index Page'
        })
      })
    })
    // res.render('index',
    //   {
    //     breads: Bread,
    //     title: 'Index Page'
    //   }
    // )
})

// CREATE
breads.post('/', (req, res) => {
    if(!req.body.image) {
        req.body.image = undefined 
    }
    if(req.body.hasGluten === 'on') {
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread.create(req.body)
    res.redirect('/breads')
  })
  

  

// NEW
// breads.get('/new', (req, res) => {
//     res.render('new')
// })
breads.get('/new', (req, res) => {
    Baker.find()
        .then(foundBakers => {
            res.render('new', {
                bakers: foundBakers
            })
      })
})


// EDIT
// breads.get('/:indexArray/edit', (req, res) => {
//     res.render('edit', {
//       bread: Bread[req.params.indexArray],
//       index: req.params.indexArray
//     })
// })
breads.get('/:id/edit', (req, res) => {
  Baker.find()
      .then(foundBakers => {
          Bread.findById(req.params.id) 
          .then(foundBread => { 
              res.render('edit', {
                  bread: foundBread, // Don't forget the comma
                  bakers: foundBakers
              })
          })
      })
  })
  

// SHOW
// breads.get('/:arrayIndex', (req, res) => {
//     if (Bread[req.params.arrayIndex]) {
//         res.render('Show', {
//         bread:Bread[req.params.arrayIndex],
//         index: req.params.arrayIndex,
//         })
//     } else {
//         res.render('404')
//     }
// })
breads.get('/:id', (req, res) => {
    Bread.findById(req.params.id)
        .populate('baker')
        .then(foundBread => {
            res.render('show', {
                bread: foundBread
            })
        })
        .catch(err => {
            res.send('404')
        })
})

// UPDATE
// breads.put('/:arrayIndex', (req, res) => {
//     if(req.body.hasGluten === 'on'){
//       req.body.hasGluten = true
//     } else {
//       req.body.hasGluten = false
//     }
//     Bread[req.params.arrayIndex] = req.body
//     res.redirect(`/breads/${req.params.arrayIndex}`)
//   })
breads.put('/:id', (req, res) => {
    if(req.body.hasGluten === 'on'){
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
      .then(updatedBread => {
        console.log(updatedBread) 
        res.redirect(`/breads/${req.params.id}`) 
      })
  })
  

// DELETE
// breads.delete('/:indexArray', (req, res) => {
//     Bread.splice(req.params.indexArray, 1)
//     res.status(303).redirect('/breads')
//   })
breads.delete('/:id', (req, res) => {
    Bread.findByIdAndDelete(req.params.id) 
      .then(deletedBread => { 
        res.status(303).redirect('/breads')
      })
  })
  
module.exports = breads
