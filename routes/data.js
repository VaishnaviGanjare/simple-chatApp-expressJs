const express=require("express");
const fs=require("fs");
const router=express.Router();
//const userpage=require('./routes/user');

router.get('/',(req,res,next)=>{
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

router.post('/',(req,res,next)=>{
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


 module.exports = router;