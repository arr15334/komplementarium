var express = require("express"),
    router  = express.Router(),
    User    = require("../models/user"),
    Baby    = require("../models/baby"),
    moment  = require("moment");

router.get('/:babyId', (req, res) => {
  const babyId = req.params.babyId
  return Baby.findById(babyId)
    .then((baby) => {
      res.send(baby)
    })
})

router.put('/:babyId', (req, res) => {
  const babyId = req.params.babyId
  console.log(req.body)
  const update = {
    name: req.body.name,
    bornDate: moment(req.body.birthdate),
    gender: (req.body.gender === 'M')
  }
  return Baby.findByIdAndUpdate(babyId, update)
    .then((baby) => {
      console.log(baby)
      res.send({success: true})
    })
    .catch(err => res.send({success: false, msg: err}))
})

router.delete('/:babyId', (req, res) => {
  const babyId = req.params.babyId

  return Baby.findByIdAndRemove(babyId)
    .then((deleted) => {
      res.send({success: true})
    })
    .catch(err => {
      res.send({success: false, msg: err})
    })
})

// measurements
router.get('/:babyId/heights', (req, res) => {
  const babyId = req.params.babyId
  const offset = req.query.page || 0
  const limite = req.query.limite || 10

  return Baby.findById(babyId)
    .then((baby) => {
      const totalPages = Math.ceil(baby.heightMeasurements.length / limite)
      let measurements = baby.heightMeasurements.slice(offset * limite, baby.heightMeasurements.length)
      if (measurements.length > limite) {
        measurements = measurements.slice(0, limite)
      }
      res.send({success: true, total: totalPages, measurements: measurements})
    })
})

router.get('/:babyId/weights', (req, res) => {
  const babyId = req.params.babyId
  const offset = req.query.page || 0
  const limite = req.query.limite || 10

  return Baby.findById(babyId)
    .then((baby) => {
      const totalPages = Math.ceil(baby.weightMeasurements.length / limite)
      let measurements = baby.weightMeasurements.slice(offset * limite, baby.weightMeasurements.length)
      if (measurements.length > limite) {
        measurements = measurements.slice(0, limite)
      }
      res.send({success: true, total: totalPages, measurements: measurements})
    })
})

// diet
router.get('/:babyId/menu', (req, res) => {
  const babyId = req.params.babyId
  const date = req.query.date || moment()
  console.log(date)

  Baby.findById(babyId).populate("diet.food").exec(function(err, baby) {
    if (err) {
      res.send({error: err})
    } else {
      let response
      for (const dietItem of baby.diet) {
        if (moment(dietItem.date).isSame(date, 'day')) {
          response = dietItem
        }
      }
      res.send({data: response})
    }
  })
})

router.put('/:babyId/menu/today', (req, res) => {
  const babyId = req.params.babyId
  const menu = req.body.menu || []
  const date = moment()

  return Baby.findById(babyId)
    .then((baby) => {
      let found = false
      for (let i = 0; i < baby.diet.length; i++) {
        const dietMenu = baby.diet[i]
        if (moment(dietMenu.date).isSame(date, 'day')) {
          baby.diet[i].food = menu
          found = true
        }
      }
      if (!found) {
        baby.diet.push({
          food: menu,
          date: moment()
        })
      }
      baby.save()
    })
    .then((baby) => {
      res.send({success: true})
    })
    .catch(err => res.send({success: false, error: err}))
})

router.post('/:babyId/menu', (req, res) => {
  const babyId = req.params.babyId
  const food = req.body.food || []

  return Baby.findById(babyId)
    .then((baby) => {
      for (const foo of food) {
        baby.diet.push({
          food: foo,
          date: moment()
        })
      }
      baby.save()
    })
    .then(() => {
      res.send({success: true})
    })
    .catch(err => {
      res.send({success: false, error: err})
    })
})

module.exports = router
