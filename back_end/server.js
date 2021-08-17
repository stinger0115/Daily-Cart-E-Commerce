const express = require("express");
const app = express();
require("./_dbconnect");
const user = require("./userSchema");
const product = require('./productSchema');
const jwt = require("jsonwebtoken");
const Authenticate = require("./middleware/authenticate");
const cookieParser = require("cookie-parser");

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//read product details
app.get("/cartitems", async (req, res) => {
  try {
    const result = await product.find();    
    res.status(200).json({ "message": "Success", "data": result });
  }
  catch (Err) {
    res.status(400).json({"message":"Something Went Wrong. Please Try Again :)"});
  }
});

//filter the products based on brandNames
app.post("/filterbrands",async (req, res) => {  
  try {
    const result = await product.find({ brandName: { $in: req.body.filterBrand } });
    res.status(200).json({ "message": "Successful" ,"elements":result});
  }
  catch(err) {
    res.status(400).send("Something went wrong while Filtering based on brands name ",err);
  }
})

//filter the products based on categories
app.post("/categoryfilter", async (req, res) => {
  try {
    const result = await product.find({ category: req.body.categoryType });    
    res.status(200).json({ "message": "Success", "data": result });
  }
  catch(err) {
    res.status(400).send("Something Went Wrong While Filtering Based On Categories ",err);
  }
})

//getting all the brands name
app.get("/brandslist", async (req, res) => {
  try {
    const result = await product.distinct("brandName");
    res.status(200).json({ "message": "Success", "data": result });
  }
  catch (err) {
    res.status(400).json({"message":"Something went wrong while sorting the products"});
  }
})

//sorting the data based on price
app.post("/sortitems", async (req, res) => {
  try {    
    const result = await product.find();
    if (req.body.priceSort === "high") {
      result.sort((a, b) => {
        return b.price - a.price;
      });
    }
    else {
      result.sort((a, b) => {
        return a.price - b.price;
      })
    }
    res.status(200).json({ "message": "Success","data":result });
  }
  catch (err) {
    console.log("Error occurred");
    res.status(400).json({"message":"Something went wrong while sorting the products"});
  }
})


//filtering on basis of price
app.post("/priceFilter", async (req, res) => {
  console.log(req.body);
  //we are converting them to string because they are obtained as json format where values are in string format
  var first = Number(req.body.minVal);
  var second = Number(req.body.maxVal);
  try {
    const result = await product.find();
    let curr = [];
    for (let i = 0; i < result.length; i++)
    {
      let x = Number(result[i].price); //value at backend also stored in string format so changing to number
      if (x >= first && x <= second)
        curr.push(result[i]);
    }
    res.status(200).json({ "message": "Success","data":curr });
  }
  catch (err) {
    res.status(400).send("Error while filtering data based on price")
  }
})


//get cart items
app.get("/getcartitems", Authenticate, async (req, res) => {
  try {
    const curruser = req.rootUser;
    let cart = curruser.cart;
    res.status(200).json({ "message": "Success", "data": cart });
  }
  catch(err) {
    res.status(400).json({ "message": "Something went wrong Please try again later.", "data": err });
  }
})


//updating cart items
app.post("/updatecartitems", Authenticate, async (req, res) => {
  try {
    const curruser = req.rootUser;
    let cart = curruser.cart;

    let index = -1;
    for (let i = 0; i < cart.length && index===-1; i++)
    {
      if (cart[i].brandName === req.body.toUpdate.brandName && cart[i].productName === req.body.toUpdate.productName) {
        index = i;
        break;
      }
    }

    if (req.body.toUpdate.remove === 1) {
      cart.splice(index, 1);
    }
    else if (req.body.toUpdate.remove === 0 && req.body.toUpdate.quantity < 0) {
      cart.splice(index, 1);
    }
    else {
      cart[index].quantity = req.body.toUpdate.quantity;
    }
    const result = await user.updateOne({ _id: curruser._id }, {
      $set: {
        cart:cart
      }
    })
    
    if (!result)
      res.status(400).json({ "message": "Something went wrong while updating the cart items", "data": err });            
    else
      res.status(200).json({ "message": "Success", "data": cart });
  }
  catch (err) {
    res.status(400).json({ "message": "Something went wrong while updating the cart items", "data": err });
  }
})



//changing element in the cart
app.patch("/tocart", Authenticate, async (req, res) => {
  try {
    // console.log(req.body.productDetails);
    const curruser = req.rootUser;
    let cart = curruser.cart;
    const productDetails = req.body.productDetails;
    // console.log("\nproduct",(productDetails.productName));
    let found = false;
    let index = -1;
    for (let i = 0; i < cart.length; i++) {
      // console.log((cart[i].productName));
      if (cart[i].productName === productDetails.productName && cart[i].brandName === productDetails.productName)
      {
        found = true;
        // console.log("inside if");
        cart[i].quantity = cart[i].quantity + productDetails.quantity;
        if (cart[i].quantity <= 0)
          index = i;
        break;
      }
    }    
    if (index != -1)
      cart.splice(index, 1);
    if (found === false)
      cart.push(productDetails);
    // console.log(cart);

    const result = await user.updateOne({ _id: curruser._id }, {
      $set: {
        cart: cart
      }
    })

    if (!result)
      res.status(500).json({ "message": "Error While Updating User Cart" });
    else
      res.status(200).json({ "message": "Success" });
  }
  catch (err) {
    res.status(400).send(`Error ${err}`);
  }
});

//user authentication
app.get("/verify", Authenticate, (req, res) => {
  res.status(200).json({ message: "Success", user: req.rootUser });
});

//user login
app.post("/loggingin", async (req, res) => {
  if (!req.body.email || !req.body.password)
    res.status(400).send("Login Details Are Missing.");

  try {
    const currUser = await user.findOne({ email: req.body.email });
    // console.log(currUser);
    if (currUser) {
      const token = await currUser.generateAuthToken();
      //first is name of cookie second is token and third is callback function
      //in callback function we can pass expires in and other options
      res.cookie("loginToken", token, {
        expires: new Date(Date.now() + 21600000), //it will expire in 6 hours from current time
        httpOnly: true, //it is for ensuring this works on http only as our project works on http not https
      });
      res.status(200).json({ message: "Success", accessToken: token });
    } else {
      res.status(400).json({ message: "No User Found Please Signup." });
    }
  } catch (err) {
    res.status(400).json({
      message: `Something Went Wrong While Logging In. Please Try Again. ${err}`,
    });
  }
});

//registering a new user
app.post("/register", (req, res) => { 
  const newUser = new user(req.body.newUser);

  //if email addresses donot match then return error
  if (req.body.newUser.email !== req.body.newUser.confirmEmail) {
    res.status(422).json({ message: "Emails Donot Match.Please Try Again :)" });
  }
  //if passwords donot match return error
  else if (req.body.newUser.confirmPassword !== req.body.newUser.password) {
    res
      .status(422)
      .json({ message: "Passwords Donot Match.Please Try Again :)" });
  } else {
    //checking if user already exist with same email or not in the database if not save user credentials to database
    user
      .findOne({ email: req.body.newUser.email })
      .then((userExist) => {
        if (userExist) {
          res.status(400).json({ message: "User Already Exist." });
        } else {
          newUser
            .save()
            .then(() => {
              res
                .status(200)
                .json({ message: "User registered successfully." });
            })
            .catch((err) => {
              // console.log("Line 70 ", err);
              res.send(500).json({
                message: `Error While Saving User to Database.${err}`,
              });
            });
        }
      })
      .catch((err) => {
        // console.log("Line 75 ", err);
        res.status(400).json({
          message: `Error While Searching For User In Database While Registration.${err}`,
        });
      });
  }
});

//logout
app.get("/logout", (req, res) => {
  try {
    res.clearCookie('loginToken', {
      path: '/'
    })
    res.status(200).json({ "message": "Success" });
  }
  catch (err) {
    res.status(400).json({ "message": "Error while Logging out", "data": err });
  }
})

//listening to new server
const PORT = process.env.PORT || 3001;
app.listen(PORT, (err) => {
  console.log(`Listening at port ${PORT} and error is ${err}`);
});
