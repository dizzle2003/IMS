const fs = require("fs");
const { config } = require('dotenv');
const connectDB = require('./config/db');
const colors = require('colors');


//Load environmental variables
config({ path: './config/config.env' });

//load model
const User = require("./models/User");

//DB connection
connectDB();


//Read User JSON Files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/data/user.json`, 'utf-8')
);



//import into DB
const importData = async () => {
   try{
    await User.create(users);
    console.log(`Data successfully imported`.green.inverse);
    process.exit();
   } 
   catch(err){
       console.error(err)
   }
}

//Delete Data
const deleteData = async () => {
    try{
        await User.deleteMany({});
        console.log('Users deleted'.red.inverse);
        process.exit()
    }
    catch(err){
        console.log(err)
    }
};

if (process.argv[2] === '-i'){
	importData();
} else if(process.argv[2] === '-d'){
	deleteData(); 
}