const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetSchema = new Schema({
    name:String,
    photo:String,
    description:String,
    score:Number,
    goodBoy:Boolean,
    bestFriends:Array
});

// this is what this file exports
module.exports = mongoose
// defines the model , retreives the petScheuma 
.model('Pet', PetSchema);