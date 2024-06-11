const express=require("express");
const router=express.Router();



router.get('/login',(req,res,next)=>{
    console.log('login page');
    res.send(`<form onsubmit="localStorage.setItem('username',document.getElementById('username').value)"
        action='/msg' method="POST" id="form">
        <input type="text" id="username" name="username">
        <button type="submit">login</button>
        </form>`);
});

router.post('/msg',(req,res,next)=>{
    console.log('msg page');
    res.send(`<form onsubmit="document.getElementById('username').value=localStorage.getItem('username')"
        action="/" method="POST" id="form">
        <input type="text" id="message" name="message">
         <input type="hidden" name="username" id="username">
        <button type="submit">send message</button>
        </form>`);
});

module.exports=router;