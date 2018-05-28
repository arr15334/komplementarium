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
      const birthdate = baby.bornDate
      res.send({success: true, total: totalPages, measurements: measurements, birthdate: birthdate})
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
      const birthdate = baby.bornDate
      res.send({success: true, total: totalPages, measurements: measurements, birthdate: birthdate})
    })
})

// diet
router.get('/:babyId/menu', (req, res) => {
  const babyId = req.params.babyId
  const date = req.query.date || moment()
  // const mealTime = req.query.mealTime || null

  Baby.findById(babyId).populate("diet.food").exec(function(err, baby) {
    if (err) {
      res.send({error: err})
    } else {
      let response = []
      for (const dietItem of baby.diet) {
        if (moment(dietItem.date).isSame(date, 'day')) {
          response.push(dietItem)
        }
      }
      res.send({data: response})
    }
  })
})

router.get('/:babyId/babymenu', (req, res) => {
  const babyId = req.params.babyId
  const date = req.query.date || moment()
  // const mealTime = req.query.mealTime || null

  Baby.findById(babyId).populate("diet.food").exec(function(err, baby) {
    if (err) {
      res.send({error: err})
    } else {
      let menu = []
      for (const dietItem of baby.diet) {
        if (moment(dietItem.date).isSame(date, 'day')) {
          menu.push(dietItem)
        }
      }
      res.send({menu: menu, baby: baby.name})
    }
  })
})

router.put('/:babyId/menu/today', (req, res) => {
  const babyId = req.params.babyId
  const menu = req.body.menu || []
  const date = moment()
  const mealTime = req.body.mealTime

  return Baby.findById(babyId)
    .then((baby) => {
      let found = false
      for (let i = 0; i < baby.diet.length; i++) {
        const dietMenu = baby.diet[i]
        if (moment(dietMenu.date).isSame(date, 'day') && dietMenu.mealTime === mealTime) {
          baby.diet[i].food = menu
          found = true
        }
      }
      if (!found) {
        baby.diet.push({
          food: menu,
          mealTime: mealTime,
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

router.post('/:babyId/menu/today', (req, res) => {
  const babyId = req.params.babyId
  const foodItem = req.body.food || ''
  const mealTime = req.body.mealTime
  const date = moment()

  return Baby.findById(babyId)
    .then((baby) => {
      let found = false
      for (let i = 0; i < baby.diet.length; i++) {
        const dietMenu = baby.diet[i]
        if (moment(dietMenu.date).isSame(date, 'day') && dietMenu.mealTime === mealTime) {
          baby.diet[i].food.push(foodItem)
          found = true
        }
      }
      if (!found) {
        baby.diet.push({
          food: [foodItem],
          date: moment(),
          mealTime: mealTime
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
