const passport = require('passport');
const jwt = require('jsonwebtoken');
const Passport_jwt = require('passport-jwt');
const local_Stratergy = require('passport-local').Strategy;
const User = require('./Models/Users');
const config = require('./configure');
const JWT_Stratergy = Passport_jwt.Strategy;
const extarctjwt =  Passport_jwt.ExtractJwt;


  
exports.Token=(user)=>{return jwt.sign(user,config.secret)}

exports.JWT_Stratergy= passport.use(new JWT_Stratergy({
    jwtFromRequest:extarctjwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:config.secret},(payload,done)=>
    {
       User.findOne({_id:payload._id},(err,user)=>
       {
         if(err)
         {
          return done(err,false);
         }
         if(user)
         {
           return done(null,user);
         }
         else
         {
           return done(null,false);
         }
       });
    }));
    exports.verify = passport.authenticate('jwt',{session:false});
    
    exports.local = passport.use(new local_Stratergy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

  
