// Here we have the code for connecting to mongo database

const mongoose = require("mongoose");

/* mongoose.connect("mongodb://127.0.0.1:27017/cashbox-api", {
  useNewUrlParser: true,
  //ds facilitates mongoose-mongodb connection so we can quickly access d data we want to access.
  useCreateIndex: true,
  //  correcting findAndModify deprecation warning
  useFindAndModify: false
}); */
mongoose.connect(
  "mongodb+srv://michaelztaskapp:123999abc@cluster0-4sjnt.mongodb.net/cashbox-api",
  {
    useNewUrlParser: true,
    //ds facilitates mongoose-mongodb connection so we can quickly access d data we want to access.
    useCreateIndex: true,
    //  correcting findAndModify deprecation warning
    useFindAndModify: false
  }
);
