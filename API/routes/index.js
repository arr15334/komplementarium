var express = require("express"),
    passport= require("passport"),
    router = express.Router(),
    User    = require("../models/user"),
    Baby    = require("../models/baby");
/*
router.get("/", function(req, res){
    res.render("home");
});
*/


//======================
// AUTH ROUTES
//======================
router.post("/register", function(req, res) {
  const name = req.body.data.attributes['first_name']
  const email = req.body.data.attributes['email']
  const password = req.body.data.attributes['password']
  const lastname = req.body.data.attributes['last_name'] || null

    User.register(new User({
      username: email,
      name: name,
      lastname: lastname
    }), password, function(err, user){
        if (err){
            return res.send({
              'success': false,
              'message': err
            })
        }
        passport.authenticate("local")(req, res, function(){
            res.send({
              'success': true,
              'user': user
            });
        });
    });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { res.json(err) }
    if (!user) { res.json({'success': false, 'message': 'no user'}) }
    req.logIn(user, function(err) {
      if (err) { res.json({'success': false, 'message': err}) }
      res.json({'success': true, 'user': user})
    });
  })(req, res, next);
});

router.get("/logout",function(req, res) {
    req.logout();
    res.json({'success': true});
});

module.exports = router;
