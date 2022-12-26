const mongoose = require('mongoose');
////////define schema
const { Schema } = mongoose;

const registerSchema = new Schema({
  name:  String, // String is shorthand for {type: String}
  email: String,
  address:String,
  mobile:Number,
  password:String,
  conpassword:String,
  date: { type: Date, default: Date.now },
 
});
////////creating a model
const Register = mongoose.model('Register', registerSchema);

module.exports=Register

// schema