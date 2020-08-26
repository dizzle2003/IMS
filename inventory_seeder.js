const fs = require("fs");
const { config } = require('dotenv');
const connectDB = require('./config/db');
const colors = require('colors');


//Load environmental variables
config({ path: './config/config.env' });

//load model
const Inventory = require("./models/Inventory");

//DB connection
connectDB();

//Read Inventory JSON files
const inventory = JSON.parse(
    fs.readFileSync(`${__dirname}/data/inventory.json`, 'utf-8')
  );

  //import into DB
const importData = async () => {
    try{
     await Inventory.create(inventory);
     console.log(`Inventory Data successfully imported`.green.inverse);
     process.exit();
    } 
    catch(err){
        console.error(err)
    }
 }
 
 //Delete Data
 const deleteData = async () => {
     try{
         await Inventory.deleteMany({});
         console.log('Inventory Data Deleted'.red.inverse);
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