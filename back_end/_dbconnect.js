const dotenv = require("dotenv");
const mongoose = require("mongoose");


//path of the env file
dotenv.config({ path:'./config.env'});

const database = process.env.database;

//connecting to database present on mongodb atlas
mongoose.connect(database, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology:true
}).then(() => {
    console.log("Connection to Database Successfully");
}).catch((err)=>{
    console.log("Error While Connecting To Database ",err);
});

