
const express = require("express");
const bodyParser= require("body-parser");
const user = require('../Models/Users');


const router = express.Router();

router.use(bodyParser.json());
router.route('/')

.get((req,res,next)=>
{
    console.log('requles',req);
    console.log('user',req.user);
    user.findOne({username:req.user.username})
    .then((user)=>
    {
        res.statusCode =200;
        res.setHeader("Content-Type","application/json");
        res.json(user);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.put((req,res,next)=>
{
   
    user.findOneAndUpdate({_id:req.user._id},{$set:req.body},{new:true})
    .then((user)=>
    {
        res.statusCode =200;
        res.setHeader("Content-Type","application/json");
        res.json(user);
    },(err)=>next(err))
    .catch((err)=>next(err));
})


.delete((req,res,next)=>
{
    user.findOneAndDelete({_id:req.user._id})
    .then((user)=>
    {
        res.statusCode =200;
        res.setHeader("Content-Type","application/json");
        res.json(user);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports = router;