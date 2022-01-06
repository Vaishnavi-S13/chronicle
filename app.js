require("dotenv").config();
const express = require("express");
const https = require("https");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth2' ).Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const findOrCreate = require('mongoose-findorcreate')
const News = require("./routes/news");
const Weather = require("./routes/weather");
const blogRouter = require("./routes/blogs");
const blogModel = require("./models/blog");
const ejs = require("ejs");
const _ =require("lodash");
const app = express();
const moment = require('moment')
app.locals.moment = moment;
app.set("view engine" ,"ejs");
app.use(express.static("public"));
app.use(express.urlencoded({limit: '10mb',extended:false}));
app.use("/news", News);
app.use("/main", Weather);
app.use("/blog", blogRouter);

app.use(session({
  secret:"Our secret is a secret.",
  resave: true,
  saveUnintialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(process.env.MONGODB_URL);

const userSchema = new mongoose.Schema ({
  name:{
    type: String,
  },
  email:{
    type:String,
},
password:{
  type: String,
},
googleId:String,
facebookId: String,
githubId:String
});
userSchema.plugin(passportLocalMongoose, {
usernameField : "email"});
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy({
    usernameField: 'email',
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
passport.use(new GoogleStrategy({
    clientID:     process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_GOOGLE,
    callbackURL: "http://localhost:3000/auth/google/main",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "https://frozen-hollows-41698.herokuapp.com/auth/facebook/main"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: "https://frozen-hollows-41698.herokuapp.com/auth/github/main"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
app.get("/", function(req, res){
  res.render("home");
});
// google login
app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));
app.get( "/auth/google/main",
    passport.authenticate( 'google', {
        successRedirect: '/main',
        failureRedirect: '/'
}));
// facebook login
app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/main',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/main');
  });
// github login
app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/main',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/main');
  });
// login with email
app.get("/register/login", function(req, res){
  res.render("register");
});
// register with email
app.get("/register/signup", function(req, res){
  res.render("register");
});
app.get("/main", function(req, res){
 if(req.isAuthenticated()){
   res.render("main",{email: req.body.email});
 }else{
   res.redirect("register/login");
 }
});
app.get("/main/about", function(req, res){
  res.render("about");
});
app.get("/main/contact", function(req, res){
  res.render("contact");
});
app.get("/study", function(req, res){
  res.render("study");
});
app.get("/logout", function(req, res){
  req.logout();
  res.redirect('/');
})
app.post("/register/signup", function(req, res){
// const Users = ({ username : req.body.email, name : req.body.name});
User.register({email:req.body.email, name:req.body.name},req.body.password, function(err, user){
  if(err){
    console.log(err);
    res.redirect("/");
  }else{
    passport.authenticate("local")(req, res, function(){
      res.redirect("/main");
    });
  }
});

});
app.post("/register/login", function(req, res){
const user = new User({
  email:req.body.email,
  password:req.body.password
});
req.login(user, function(err){
  if(err){
    console.log(err);
  }else{
    passport.authenticate("local")(req, res, function(){
      res.redirect("/main");
    });
  }
})
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function(req,res){
  console.log("connected");
});
