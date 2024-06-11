
const express=require("express");
const app=express();
const datapage=require('./routes/data.js');
const userpage=require('./routes/user.js');
const bodyParser=require('body-parser');

app.get('/favicon.ico', (req, res) => res.status(204));
app.use(bodyParser.urlencoded({extended: false}));

app.use(userpage);
app.use(datapage);

app.use('/',(req,res,next)=>{console.log("Error page");
    res.status(404).send('<h>Page not found</h>');
});

app.listen(4000);