const mongoose          = require("mongoose"),
      express           = require("express"),
      bodyParser        = require("body-parser"),
      passport          = require("passport"),
      LocalStrategy     = require("passport-local"),
      User              = require("./models/userModel"),
      expressSession    = require("express-session"),
      app               = express();

const indexRoutes       = require("./routes/indexRoutes");

mongoose.connect("mongodb://localhost/krizmasasi", { useNewUrlParser: true, useUnifiedTopology: true });
app.set('view engine', 'ejs' );
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(require("express-session")({
    secret:"Guvenlik Cumlemiz",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
    res.locals.currentUser=req.user;
    next();
});

app.use(indexRoutes);


const server = app.listen(3000, (err)=>{
    if(err){
        console.log(err);
    }
    console.log("Success at", server.address().port);
});