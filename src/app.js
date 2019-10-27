//We load all our route files here (we only have one currently)
const userRouter = require("./routers/user");

//loading our mongoose.js file where we have the code for connecting to database
require("./db/mongoose");
/*Creating our server*/
const express = require("express");
const app = express();
const cors = require("cors");

//Allowing options request on all resources
app.options("*", cors());

app.use(express.json()); //passing json to obj automatically
app.use(userRouter); //registering our userRouter

//2-  We define our port
// const port = process.env.PORT;
const port = 3000;

//3-  Then we call on listen
app.listen(port, () => {
  console.log("Server is up and running on " + port);
});

module.exports = app;
