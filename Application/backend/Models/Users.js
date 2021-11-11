const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passport_mongoose = require('passport-local-mongoose');

const User = new Schema(
    {
        firstname:
        {
            type:String,
            default:''
        },
        lastname:
        {
            type:String,
            default:''
        },
        email:
        {
            type:String,
            required:true
        },
        gender:
        {
            type:String,
            default:''
        }

    },{timestamps:true}
);

mongoose.plugin(passport_mongoose);

module.exports = mongoose.model('user',User);