const jwt = require("jsonwebtoken");
const user = require("../userSchema");


const Authenticate = async (req,res,next) => {
    try {
        //loginToken is the name of the accessToken that we stored in cookies which will be passed from frontEnd to backend and verified here
        const token = req.cookies.loginToken;                
        //verifying the token present in cookies with the secret key        
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        //finding if user exist or not if it exist all the details of the user will be obtained in verifyToken
        const rootUser = await user.findOne({ _id: verifyToken._id, "tokens.token": token });

        if (!rootUser) {
            throw new Error('User Not Found');
        }

        //we are using middleware so before going to req or res request in about us or any other page where we are checking authentication it will set token,rootUser,userID so as to get Data of that user
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        //it means we have processed here successfully go on for next methods or request i.e authenticated
        next();
    }
    catch (err) {
        // console.log(err);
        res.status(400).json({"message":"Unauthorized User.Please Login To Continue."})
    }
}

module.exports = Authenticate;