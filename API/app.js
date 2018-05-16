var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy   =require("passport-local"),
    User        = require("./models/user"),
    cors     = require('cors'),
    seedDB      = require("./seeders/foodSeed")
// require the routes
var indexRoutes   = require("./routes/index");
var userRoutes    = require("./routes/userActions")
var foodRoutes    = require("./routes/foodRoutes")



app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://siddhartha:engappsados@ds147589.mlab.com:47589/komplementarium");
// seedDB();

//===========
// PASSPORT CONFIG
//===========
app.use(require("express-session")({
    secret: "corsair feline",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


//codificar y decodificar la session. esto funciona por pasar el plugin
//passport.use(new LocalStrategy(User.authenticate()));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//====================================
//  routes
//====================================
app.use(indexRoutes);
app.use("/food", foodRoutes);
app.use("/users", userRoutes);
//app.use("/campgrounds/:id/comments",commentsRoutes);
//app.use("/campgrounds/",campgroundsRoutes);

app.listen(3000, function() {
  console.log("localhost:3000")
});
