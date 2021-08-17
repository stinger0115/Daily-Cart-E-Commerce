const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");


//creating new user schema
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  confirmEmail: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  confirmPassword: {
    type: String,
    require: true,
  },
  cart: {
    type: Array,
  },
  tokens: [
    {
      token: {
        type: String,
        require:true
      }
    }
  ]
});

//generating accessToken
//we are not using Fat Arrow function because 'this' keyword don't work with 'this' keyword
userSchema.methods.generateAuthToken = async function () {
  try {
    //first parameter is payload i.e unique value second parameter is secret key i.e min 32 bit characters
    let token = jwt.sign({ _id: this._id, }, process.env.SECRET_KEY);
    //saving the currently generated accessToken
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  }
  catch (err) {
    console.log(`Error in userSchema.js while generating accesstoken. ${err}`)
    return err;
  }
}

//creating new user model
const user = new mongoose.model("Registration", userSchema);

module.exports = user;