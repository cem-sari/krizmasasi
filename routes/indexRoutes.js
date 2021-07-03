const   express       = require("express");
        router        = express.Router();

router.get("/", (req, res)=>{
    res.render('welcome');
});

router.get("/signin", (req, res)=>{
    res.render('signin');
});

router.get("/signup", (req, res)=>{
    res.render('signup');
});

router.post("/", (req, res)=>{
    console.log(req.body);
});

module.exports = router;