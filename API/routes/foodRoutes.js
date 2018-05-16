var express = require("express"),
    router  = express.Router(),
    Food    = require("../models/food"),
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

module.exports = router
