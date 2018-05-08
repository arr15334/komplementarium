var express = require("express"),
    router  = express.Router(),
    User    = require("../models/user"),
    Baby    = require("../models/baby"),
    moment  = require("moment");

// save a new baby
router.post("/:userId/babies", function (req, res) {
  const userId  = req.params.userId
  const name    = req.body.data['name']
  const gender    = req.body.data['gender']
  const weight    = req.body.data['weight']
  const height    = req.body.data['height']
  const bornDate  = req.body.data['bornDate']

  let baby = new Baby;

  baby.userId = userId
  baby.name   = name
  baby.gender = (gender === 'M')
  baby.weightMeasurements.push({weight: weight, date: moment()})
  baby.heightMeasurements.push({height: height, date: moment()})
  baby.bornDate = new Date(bornDate)
  baby.save()


  User.findById(userId, function(err, user) {
    if (err) {
      console.log(err)
      res.json({success: false, error: err})
    } else {
      user.babies.push(baby)
      user.save()
      res.json({
        'success': true
      })
    }
  })
})

router.get("/:userId/babies", function (req, res) {
  const userId = req.params.userId
  User.findById(userId).populate("babies").exec(function (err, user) {
    if (err) {
      res.json({'success': false, 'message': err})
    }
    res.json({'success': true, 'user': user})
  })
})

router.post("/:userId/babies/:babyId/heights" , function (req, res) {
  const babyId = req.params.babyId
  const height = req.body.data['height_measurement']
  const date = moment()

  Baby.findById(babyId, function(err, baby) {
    if (err) {
      console.log(err)
      res.json({success: false, error: err})
    } else {
      baby.heightMeasurements.push({height: height, date: date})
      baby.save()
      res.json({success: true})
    }
  })
})

router.get("/:userId/babies/:babyId/heights", function (req, res) {
  const babyId = req.params.babyId
  Baby.findById(babyId, function(err, baby) {
    if (err) {
      console.log(err)
      res.json({success: false, error: err})
    } else {
      const heights = baby.heightMeasurements
      res.json({success: true, heights: heights})
    }
  })
})

router.post("/:userId/babies/:babyId/weights" , function (req, res) {
  const babyId = req.params.babyId
  const weight = req.body.data['weight_measurement']
  const date = moment()

  Baby.findById(babyId, function(err, baby) {
    if (err) {
      console.log(err)
      res.json({success: false, error: err})
    } else {
      baby.weightMeasurements.push({weight: weight, date: date})
      baby.save()
      res.json({success: true})
    }
  })
})

router.get("/:userId/babies/:babyId/weights", function (req, res) {
  const babyId = req.params.babyId
  Baby.findById(babyId, function(err, baby) {
    if (err) {
      console.log(err)
      res.json({success: false, error: err})
    } else {
      const weights = baby.weightMeasurements
      res.json({success: true, weights: weights})
    }
  })
})
module.exports = router;
