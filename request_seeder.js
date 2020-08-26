const fs = require("fs");
const { config } = require('dotenv');
const connectDB = require('./config/db');
const colors = require('colors');


//Load environmental variables
config({ path: './config/config.env' });

//load model
const Request = require("./models/Request");

//DB connection
connectDB();

//Read Inventory JSON files
const request = JSON.parse(
    fs.readFileSync(`${__dirname}/data/request.json`, 'utf-8')
  );

  //import into DB
const importData = async () => {
    try{
     await Request.create(request);
     console.log(`Request Data successfully imported`.green.inverse);
     process.exit();
    } 
    catch(err){
        console.error(err)
    }
 }
 
 //Delete Data
 const deleteData = async () => {
     try{
         await Request.deleteMany({});
         console.log('Request Data Deleted'.red.inverse);
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