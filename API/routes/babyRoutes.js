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

module.exports = router
