const mongoose = require("mongoose");


const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  });

  console.log(`Mongo Connected on ${conn.connection.host}`);
};

module.exports = connectDB;
