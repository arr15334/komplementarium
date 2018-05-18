var express = require("express"),
    router  = express.Router(),
    Food    = require("../models/food"),
    Baby    = require("../models/baby"),
    moment  = require("moment");

router.get("/months", (req, res) => {
  const babyMonths = req.query.month * 1 || 0
  Food.find({month: {$lte: babyMonths}})
    .then((foods) => {
      res.json({food: foods})
    })
    .catch(err => {
      throw err
    })
})
/*
router.post('/:babyId', (req, res) => {
  const babyId = req.params.babyId
  const food = req.body.food
  Baby.findById(babyId, function(err, baby) {
    if (err) {
      console.log(err)
      res.json({success: false, msg: err})
    } else {
      baby.diet.push({
        food: food,
        date: moment()
      })
      baby.save()
      res.json({success: true})
    }
  })
})
*/
module.exports = router
