
const express=require("express");
const fs=require("fs");
const app=express();
//const datapage=require('./routes/data');
//const userpage=require('./routes/user');
const bodyParser=require('body-parser');

app.get('/favicon.ico', (req, res) => res.status(204));
app.use(bodyParser.urlencoded({extended: false}));

//app.use('/',datapage);
//app.use('/',userpage);

app.get('/login',(req,res,next)=>{
    console.log('login page');
    res.send(`<form onsubmit="localStorage.setItem('username',document.getElementById('username').value)"
        action='/msg' method="POST" id="form">
        <input type="text" id="username" name="username">
        <button type="submit">login</button>
        </form>`);
});

app.use('/msg',(req,res,next)=>{
    console.log('msg page');
    res.send(`<form onsubmit="document.getElementById('username').value=localStorage.getItem('username')"
        action="/" method="POST" id="form">
        <input type="text" id="message" name="message">
         <input type="hidden" name="username" id="username">
        <button type="submit">send message</button>
        </form>`);
});

app.get('/',(req,res,next)=>{
    fs.readFile("message.txt", (err,data)=>{
        console.log("readFile");
        if(err){
            console.log(err);
            data="no data";
        }
        res.send(`${data}<form onsubmit="document.getElementById('username').value=localStorage.getItem('username')" 
        method='POST' action='/'><br>
        <input type ="text" placeholder="message" name="message" id="message">
        <input type="hidden" name="username" id="username"><button type="submit">
        send message</button></form>`);
    });
});

app.post('/',(req,res,next)=>{
    console.log("writefile");
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.message);
    fs.appendFile("message.txt",`${req.body.username}:${req.body.message}`,(err)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/');
        }
        
    });
});

app.use('/',(req,res,next)=>{console.log("Error page");
    res.status(404).send('<h>Page not found</h>');
});

app.listen(4000);