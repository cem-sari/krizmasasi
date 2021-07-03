const mongoose          = require("mongoose"),
      express           = require("express"),
      app               = express();

const indexRoutes       = require("./routes/indexRoutes");


mongoose.connect("mongodb://localhost/krizmasasi", { useNewUrlParser: true, useUnifiedTopology: true });
app.set('view engine', 'ejs' );
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(indexRoutes);


const server = app.listen(3000, (err)=>{
    if(err){
        console.log(err);
    }
    console.log("Success at", server.address().port);
});