var express = require('express');
const authenticate = require('../authenticating');
const User = require('../Models/Users');
const bodyParser = require('body-parser');
const passport = require('passport');
var router = express.Router();

router.use(bodyParser.json());
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/singup',(req,res,next)=>
{
  User.register(new User({username:req.body.username,firstname:req.body.firstname,lastname:req.body.lastname,email:req.body.email,gender:req.body.gender}),req.body.password,(err,user)=>
  {
    if(err)
    {
      res.statusCode=500;
      res.setHeader('Content-Type','application/json');
      res.json(err)
    }
    else
    {
      passport.authenticate('local')
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json({status:"ok",messege:"the account is successfully created"});
      
    }
  });

});

router.post('/login',passport.authenticate('local'),(req,res,next)=>
{
  var token = authenticate.Token({_id:req.user._id})
  res.statusCode = 200;
  res.setHeader('Content-Type','application/json');
  res.json({success:true,token:token , status:'Login Successful!'});
});


router.get('/logout',(req,res,next)=>
{
     req.logOut();
    res.statusCode = 200;
    res.redirect('/');
})

module.exports = router;
