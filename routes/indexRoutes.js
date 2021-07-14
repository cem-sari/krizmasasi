const   express       = require("express"),
        router        = express.Router(),
        passport      = require("passport"),
        User          = require("../models/userModel"),
        app           = express();

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    } else
    res.redirect("/signin")
};

function isLoggedOut(req, res, next){
   if(req.isAuthenticated()) {
       res.redirect("/")
   } else
   return next();
};

router.get("/", (req, res)=>{
    res.render('signin');
});

router.get("/signup", isLoggedIn, (req, res)=>{
    res.render('signup');
});

router.post("/signup", (req, res)=>{

    let newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, (err, User)=>{
        if(err){
            console.log(err);
            res.redirect("/");
        }
        passport.authenticate("local")(req, res, ()=>{
            res.redirect('/signin');
        });
    })
});

router.get("/signin", (req, res)=>{
    res.render('signin');
});

router.post("/signin", passport.authenticate("local",
    {
        successRedirect:"/soon", //eslesiyorsa
        failureRedirect:"/signin" //eslesmiyorsa
    }),(req, res)=>{});

router.get("/soon", (req, res)=>{
        res.render('soon');
        console.log(req.user.username)
});

router.get("/room", (req, res)=>{
    res.render('room');
});

router.post("/", (req, res)=>{
    console.log(req.body);
});

router.get("/signout", (req, res)=>{
    req.logout();
    res.redirect("/room");
});

module.exports = router;